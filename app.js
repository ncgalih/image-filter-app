import { imageToMatrix, matrixToImage, saturation, transform } from "./imagematrix.js"

const canvas = document.getElementById('canvas')
const input = document.getElementById('input')
canvas.style.width = '32rem'
canvas.style.height = 'auto'
canvas.style.backgroundColor = 'gray'

input.onchange = () => getInput()
const getInput = () => {
    canvas.style.backgroundColor = 'rgba(0,0,0,0)'
    const reader = new FileReader()
    const file = input.files[0]
    const img = document.createElement('img')
    reader.onloadend = () => {
        img.width = 512
        img.height = 768
        img.src = reader.result
        img.onload = () => {
            const image_data = imageToMatrix(img)
            matrixToImage(image_data,canvas) 
        }
    }

    reader.readAsDataURL(file)
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
            const result = transform(image_data, saturation(0.5))
            matrixToImage(result, canvas) 
        }
    }
    reader.readAsDataURL(file)
}
const saturation_btn = document.getElementById('saturation')
saturation_btn.onclick = () => render()