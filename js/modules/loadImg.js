export function loadImg() {
    document.querySelector("#myFileInput").addEventListener("change", function () {
        const reader = new FileReader();

        // reader.height = height;
        // reader.width = width;

        // let ratio = reader.height / reader.width; //соотношение сторон img
        // let height = 640;
        // let width = height/ratio;

        // if (width > 741) {
        //     ratio = reader.width / reader.height; //соотношение сторон img
        //     width = 740;
        //     height = width/ratio;
        // }

        

        reader.addEventListener("load", () => {
            localStorage.setItem("recent-image", reader.result);
        });
        
        reader.readAsDataURL(this.files[0]);
    });

    // document.addEventListener("DOMContentLoaded", () => {
    //     localStorage.getItem("recent-image");
    //     // if (recentImageDataUrl) {
    //     //     //document.querySelector('#imgPreview').setAttribute("src", recentImageDataUrl);
    //     //     //document.querySelector('#photo').setAttribute("src", recentImageDataUrl);
    //     // }
    // });
}