'use strict';



window.onload = function() {

	const canvas = document.getElementById("drawingCanvas");
	const context = canvas.getContext("2d");

	let img = new Image();

	//подгрузка картинки в canvas из LocalStorage

	img.src = localStorage.getItem("recent-image");

	//приведение картинки к размерам окна холста,

	let ratio = img.height / img.width; //соотношение сторон img
	let height = 660;
	let width = height/ratio;

	if (width > 741) {
		ratio = img.width / img.height; //соотношение сторон img
		width = 760;
		height = width/ratio;
	}

	img.onload = function() {
		context.drawImage(img, 0, 0, width, height);

		let imgData = context.getImageData(0, 0, width, height)

		for (let i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i] = 255 - imgData.data[i];
			imgData.data[i+1] = 255 - imgData.data[i+1];
			imgData.data[i+2] = 255 - imgData.data[i+2];
			imgData.data[i+3] = 55;
		}
		context.putImageData(imgData, 0, 0);

		console.log(imgData)
	};
};

document.querySelector("#myFileInput").addEventListener("change", function () {
    const preview = document.querySelector('img');
    const file    = document.querySelector('input[type=file]').files[0];
    const reader  = new FileReader();

    reader.onloadend = function () {
    preview.src = reader.result;
    }

	reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
    });

    if (file) {
    reader.readAsDataURL(file);
    } else {
    preview.src = "";
    }
	alert('обновите страницу')
});


