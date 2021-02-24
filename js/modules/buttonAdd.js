const element = (tag, classes = [], content) => {
    const node = document.createElement(tag)

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content
    }

    return node
}

export function buttonAdd(myInput, myImgSrc) {
    const input = document.querySelector(myInput)
    const img = document.querySelector(myImgSrc)

    //const removeImgBtn = element('button', ['btn'], 'Поместить на Холст')
    const loadImgBtn = element('button', ['btn'], 'Выберете Картинку')

    //input.insertAdjacentElement("afterend", removeImgBtn)
    input.insertAdjacentElement("afterend", loadImgBtn)

    // const triggerImgBtn = () => {
    //     const imgloading = document.querySelector('#myImg')
    //     const get = document.querySelector('#myImg').files[0];
    //    // const readerImg = new FileReader();

    //     //imgloading.src = readerImg.result;
    //     //readerImg.readAsDataURL(get);

    //     console.log(imgloading.src)
    // }
    const triggerInput = () => input.click()
    

    //removeImgBtn.addEventListener('click', triggerImgBtn)
    loadImgBtn.addEventListener('click', triggerInput)

}
