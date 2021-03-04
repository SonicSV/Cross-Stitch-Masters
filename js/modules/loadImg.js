'use strict';

const pixeled = function() {
    let sourceimage = document.querySelector('img');
    sourceimage.src = localStorage.getItem('recent-image')
    let canvas = document.querySelector('#paintTest');
    let colourlist = document.querySelector('ol');
    let context = canvas.getContext('2d');
    let width = sourceimage.width;
    let height = sourceimage.height;
    canvas.height = height;
    canvas.width = width;
    context.drawImage(sourceimage,0,0);
    let colours = {};
    let sortedcolours = [];
    let data = context.getImageData(0,0,width,height).data;
    let all = data.length;

    for (let i = 0; i < all;i += 4) {
        let key = data[i] + '-' + data[i+1] + '-' + data[i+2];
        if (colours[key]){
        colours[key]++;
        } else {
        colours[key] = 1;
        }
    }

    sortedcolours = Object.keys(colours).sort(
        function(a, b) {
        return -(colours[a] - colours[b]);
        }
    );

    let out = '';
    sortedcolours.forEach(function(key){
        let rgb = key.split('-');
        out += '<li><button style="background: rgb(' +
            rgb[0] + ',' + rgb[1] + ',' + rgb[2] +
            ');">' + rgb + '</button> ' + '</li>';
    });

    colourlist.innerHTML = out;
}

window.addEventListener("load", pixeled);

const loadDOM = function() {
	const canvas = document.getElementById("drawingCanvas");
	const context = canvas.getContext("2d");
    let img = new Image();
    img.src = localStorage.getItem("recent-image");
	let ratio = img.height / img.width;
	let height = canvas.height;
	let width = height/ratio;

	if (width > canvas.width) {
		ratio = img.width / img.height;
		width = canvas.width;
		height = width/ratio;
	}

	img.onload = function() {
		context.drawImage(img, 0, 0, width, height);
	};
};

window.addEventListener("load", loadDOM);

const blockPix = function() {

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let img1 = new Image();
    img1.src = document.getElementById("quantized_img").src;

    img1.onload = function() {
        document.getElementById("quantized_img");
        let width = img1.width;
        let height = img1.height;
        let sampleSize

        canvas.width = width;
        canvas.height = height;
        
        context.drawImage(img1, 0, 0);

        let pixelArray = context.getImageData(0, 0, width, height).data;
        if (width > height) {
            sampleSize = Math.floor(width/100);
        } else {
            sampleSize = Math.floor(height/100);
        }
        
        for (let y = 0; y < height; y+= sampleSize)
            for (let x = 0; x < width; x+= sampleSize) {
                let p = (x + (y * width)) * 4;
                context.fillStyle = "rgba(" + pixelArray[p] + "," + pixelArray[p+1] + 
                "," + pixelArray[p+2] + "," + pixelArray[p+3] + ")";
                context.fillRect(x, y, sampleSize, sampleSize);
        }
        
        let img2 = new Image();
        img2.src = canvas.toDataURL();

        let dataURL = canvas.toDataURL();
        localStorage.setItem("recent-image", dataURL);
    }
}


const refreshColor = document.querySelector('#refresh_btn')
const refreshImg = document.querySelector('#refresh_btn')
const blockPixel = document.querySelector('#refresh')
refreshColor.addEventListener('click',pixeled )
refreshImg.addEventListener('click',loadDOM )
blockPixel.addEventListener('click',blockPix )