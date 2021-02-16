canvas = document.getElementById("drawingCanvas");
context = canvas.getContext("2d");

var img = document.getElementById("photo");
context.drawImage(img, 10, 10, 600, 400);