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

export function buttonAdd(selector) {
    const input = document.querySelector(selector)

    const openBtn = element('button', ['btn'], 'Обновить')
    const loadImg = element('button', ['btn'], 'Загрузить')

    input.insertAdjacentElement("afterend", openBtn)
    input.insertAdjacentElement("afterend", loadImg)

    const triggerInput = () => input.click()

    loadImg.addEventListener('click', triggerInput)

}

