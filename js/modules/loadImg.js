'use strict';

//загрузка картинки в LocalStorage

// export function loadImg() {
//     document.querySelector("#myFileInput").addEventListener("change", function () {
//         const reader = new FileReader();

//         reader.addEventListener("load", () => {
//             localStorage.setItem("recent-image", reader.result);
//         });
        
//         reader.readAsDataURL(this.files[0]);
//     });

// }


// export function loadImg() {
//     document.querySelector("#myFileInput").addEventListener("onchange", function () {
//     const preview = document.querySelector('img');
//     const file    = document.querySelector('input[type=file]').files[0];
//     const reader  = new FileReader();

//     reader.onloadend = function () {
//     preview.src = reader.result;
//     }

//     if (file) {
//     reader.readAsDataURL(file);
//     } else {
//     preview.src = "";
//     }
// });
// }


// export function loadImg() {
//     const preview = document.querySelector('img');
//     const file    = document.querySelector('input[type=file]').files[0];
//     const reader  = new FileReader();

//     reader.onloadend = function () {
//     preview.src = reader.result;
//     }

//     if (file) {
//     reader.readAsDataURL(file);
//     } else {
//     preview.src = "";
//     }
//     console.log('Hello')
// }
