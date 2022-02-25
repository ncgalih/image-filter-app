import { brightness, contrast, imageToMatrix, matrixToImage, saturation, transform } from "./imagematrix.js"

const canvas = document.getElementById('canvas')
const input = document.getElementById('input')
const download = document.getElementById('download')
canvas.style.width = 'auto'
canvas.style.height = 'auto'
canvas.style.backgroundColor = 'gray'

input.onchange = () => {
    render()
    if(input.files[0]){ 
        input.style.display = 'none'
        download.style.display = 'inline'
        document.getElementById('input-btn').style.display = 'none'
    }
}
const render = () => {
    const reader = new FileReader()
    const file = input.files[0]
    const img = document.createElement('img')
    reader.onloadend = () => {
        img.width = 512
        img.height = 768
        img.src = reader.result
        img.onload = () => {
            const image_data = imageToMatrix(img)
            const result = transform(image_data, 
                brightness((new Number(brightInput.value)+100)/100),
                contrast(new Number(contrastInput.value)/100),
                saturation(new Number(saturationInput.value)/100)
                )
            matrixToImage(result, canvas) 
        }
    }
    reader.readAsDataURL(file)
}

const brightInput = document.getElementById('brightness')
brightInput.onchange = (e) => render()

const contrastInput = document.getElementById('contrast')
contrastInput.onchange = () => render()

const saturationInput = document.getElementById('saturation')
saturationInput.onchange = () => render()

const reset = document.getElementById('reset')
reset.onclick = () => {
    brightInput.value = 0
    contrastInput.value = 0
    saturationInput.value = 100
    render()
}

download.onclick = () => {
    const dl = canvas.toDataURL('image/png')
    download.href = dl
    download.download = 'result'
}