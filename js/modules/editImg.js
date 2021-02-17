canvas = document.getElementById("drawingCanvas");
context = canvas.getContext("2d");

// let img = document.getElementById("photo");
// context.drawImage(img, 10, 10, 780, 450);

let img = new Image();

img.onload = function() {
	context.drawImage(img, 10, 10, width, height);
};

img.src = localStorage.getItem("recent-image");

let ratio = img.height / img.width; //соотношение сторон img
let height = 640;
let width = height/ratio;

if (width > 741) {
	ratio = img.width / img.height; //соотношение сторон img
	width = 740;
	height = width/ratio;
}
