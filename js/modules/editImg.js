canvas = document.getElementById("drawingCanvas");
context = canvas.getContext("2d");

// let img = document.getElementById("photo");
// context.drawImage(img, 10, 10, 780, 450);

let img = new Image();

img.onload = function() {
	context.drawImage(img, 10, 10, 740, 640);
};

img.src = localStorage.getItem("recent-image");