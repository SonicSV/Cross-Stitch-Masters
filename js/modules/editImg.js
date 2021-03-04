'use strict';

const maxPixels = 50000;
let colorValue = 10    // Количество цветов палитры
let centroids = [];

let arrays_equal = function(a1, a2) {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; ++i) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};

let rescaleDimensions = function(w, h, pixels) {
  let aspectRatio = w / h;
  let scalingFactor = Math.sqrt(pixels / aspectRatio);
  let rescaled_w = Math.floor(aspectRatio * scalingFactor);
  let rescaled_h = Math.floor(scalingFactor);
  return [rescaled_w, rescaled_h];
};

let getPixelDataset = function(img, resizedPixels) {
  if (resizedPixels === undefined) resizedPixels = -1;
  let canvas = document.createElement("canvas");
  let imgNumPixels = img.width * img.height;
  let canvasWidth = img.width;
  let canvasHeight = img.height;

  if (resizedPixels > 0 && imgNumPixels > resizedPixels) {
    let rescaled = rescaleDimensions(img.width, img.height, resizedPixels);
    canvasWidth = rescaled[0];
    canvasHeight = rescaled[1];
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let canvasNumPixels = canvasWidth * canvasHeight;
  let context = canvas.getContext("2d");
  context.drawImage(img, 0, 0, canvasWidth, canvasHeight);  
  let flattenedDataSet = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
  let numChannels = flattenedDataSet.length / canvasNumPixels;
  let dataset = [];

  for (let i = 0; i < flattenedDataSet.length; i += numChannels) {
    dataset.push(flattenedDataSet.slice(i, i + numChannels));
  }
  return dataset;
};

let nearestNeighbor = function(point, neighbors) {
  let bestDist = Infinity;
  let bestIndex = -1;
  for (let i = 0; i < neighbors.length; ++i) {
    let neighbor = neighbors[i];
    let dist = 0;
    for (let j = 0; j < point.length; ++j) {
      dist += Math.pow(point[j] - neighbor[j], 2);
    }
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }
  return bestIndex;
};

let centroid = function(dataset) {
  if (dataset.length === 0) return [];
  let runningCentroid = [];
  for (let i = 0; i < dataset[0].length; ++i) {
    runningCentroid.push(0);
  }
  for (let i = 0; i < dataset.length; ++i) {
    let point = dataset[i];
    for (let j = 0; j < point.length; ++j) {
      runningCentroid[j] += (point[j] - runningCentroid[j]) / (i+1);
    }
  }
  return runningCentroid;
};

let colorMeans = function(dataset, colorValue) {
  if (colorValue === undefined) colorValue = Math.min(3, dataset.length);

  let rngSeed = 0;
  let random = function() {
    rngSeed = (rngSeed * 9301 + 49297) % 233280;
    return rngSeed / 233280;
  };

  for (let i = 0; i < colorValue; ++i) {
    let idx = Math.floor(random() * dataset.length);
    centroids.push(dataset[idx]);
  }

  while (true) {
    let clusters = [];
    for (let i = 0; i < colorValue; ++i) {
      clusters.push([]);
    }
    for (let i = 0; i < dataset.length; ++i) {
      let point = dataset[i];
      let nearest_centroid = nearestNeighbor(point, centroids);
      clusters[nearest_centroid].push(point);
    }
    let converged = true;
    for (let i = 0; i < colorValue; ++i) {
      let cluster = clusters[i];
      let centroid_i = [];
      if (cluster.length > 0) {
        centroid_i = centroid(cluster);
      } else {
        let idx = Math.floor(random() * dataset.length);
        centroid_i = dataset[idx];
      }
      converged = converged && arrays_equal(centroid_i, centroids[i]);
      centroids[i] = centroid_i;
    }
    if (converged) break;
  }
  return centroids;
};

let quantize = function(img, colors) {
  let width = img.width;
  let height = img.height;
  let sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  let sourceContext = sourceCanvas.getContext("2d");
  sourceContext.drawImage(img, 0, 0, width, height);
  let flattenedSourceData = sourceContext.getImageData(0, 0, width, height).data;

  let numPixels = width * height;
  let numChannels = flattenedSourceData.length / numPixels;
  let flattenedQuantizedData = new Uint8ClampedArray(flattenedSourceData.length);
  let currentPixel = new Uint8ClampedArray(numChannels);

  for (let i = 0; i < flattenedSourceData.length; i += numChannels) {
    for (let j = 0; j < numChannels; ++j) {
      currentPixel[j] = flattenedSourceData[i + j];
    }

    let nearestColorIndex = nearestNeighbor(currentPixel, colors);
    let nearestColor = centroids[nearestColorIndex];
	
    for (let j = 0; j < nearestColor.length; ++j) {
      flattenedQuantizedData[i+j] = nearestColor[j];
    }
  }
  
  let quantizedCanvas = document.createElement("canvas");
  quantizedCanvas.width = width;
  quantizedCanvas.height = height;
  let quantizedContext = quantizedCanvas.getContext("2d");
  
  let image = quantizedContext.createImageData(width, height);
  image.data.set(flattenedQuantizedData);
  quantizedContext.putImageData(image, 0, 0);

  let dataURL = quantizedCanvas.toDataURL();
  localStorage.setItem("recent-image", dataURL);

  return dataURL;
};

let inputFileElement = document.getElementById("input_file");
let quantizeBtnElement = document.getElementById("quantize_btn");
let quantizedImgElement = document.getElementById("quantized_img");

quantizeBtnElement.addEventListener("click", function() {
  let files = inputFileElement.files;
  if (!FileReader || !files || !files.length) return;
  let reader = new FileReader();
  reader.addEventListener("load", function() {

    let img = new Image();
    img.onload = function() {
      requestAnimationFrame(function() {
        setTimeout(function() {
          let pixelDataset = getPixelDataset(img, maxPixels);
          let centroids = colorMeans(pixelDataset, colorValue);
          let dataURL = quantize(img, centroids);
          quantizedImgElement.src = dataURL;
        }, 0);
      });
    };
    img.src = reader.result;
  });
  reader.readAsDataURL(files[0]);
});