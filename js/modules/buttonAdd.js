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

export function buttonAdd(myInput, myImgSrc, inputFile) {
    const input = document.querySelector(myInput)
    const img = document.querySelector(myImgSrc)
    const pixel = document.querySelector(inputFile)

    const pixelImgBtn = element('button', ['btn'], 'выбор картинки')
    //const loadImgBtn = element('button', ['btn'], 'Выберете Картинку')

    //input.insertAdjacentElement("afterend", removeImgBtn)
    pixel.insertAdjacentElement("afterend", pixelImgBtn)
    //input.insertAdjacentElement("afterend", loadImgBtn)


    //const triggerInput = () => input.click()
    const triggerpixelImgBtn = () => pixel.click()
    

    pixelImgBtn.addEventListener('click', triggerpixelImgBtn)
    //loadImgBtn.addEventListener('click', triggerInput)

}
