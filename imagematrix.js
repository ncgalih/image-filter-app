const imageToMatrix = (img_element) => { //convert image to matrix 
    const h = img_element.naturalHeight/2
    const w = img_element.naturalWidth/2   

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img_element,0,0, canvas.width, canvas.height)
    const data = ctx.getImageData(0,0,w,h)
    
    return data 
}
const matrixToImage = (image_data, canvas, type='rgba') => {
    canvas.height = image_data.height
    canvas.width = image_data.width
    const ctx = canvas.getContext('2d')
    ctx.putImageData(image_data,0,0)
}
const transform = (imagedata, transformer) => {
    const data = new ImageData(imagedata.width, imagedata.height)
    for (let i = 0; i < imagedata.data.length; i += 4) {
        const value = [imagedata.data[i], imagedata.data[i+1], imagedata.data[i+2], imagedata.data[i+3]]
        const newValue = transformer(value)
        newValue.forEach((val, key)=>{ data.data[i+key] = val })
    }
    return data
}
const grayScale = () => (col) => { //convert rgba to grayscale
    const val = Math.floor(col[0]*0.299 + col[1]*0.587 + col[2]*0.114)
    return (255-val)*(col[3]/256)
}
const brightness = (scale) => (val) => {
    return [val[0]*scale, val[1]*scale, val[2]*scale, val[3]]
}
const contrast = (scale) => (val) => {
    const factor = (259 * (scale*255 + 255)) / (255 * (259 - scale*255))
    const red = Math.floor(factor * (val[0] - 128) + 128)
    const green = Math.floor(factor * (val[1] - 128) + 128)
    const blue = Math.floor(factor * (val[2] - 128) + 128)
    return [red, green, blue, val[3]]
}
const wgt = [0.3086, 0.6094, 0.0820]
const saturation = (s) => (val) => {
    return [
        Math.floor(((1-s)*wgt[0] + s)*val[0] + (1-s)*wgt[1]*val[1] + (1-s)*wgt[2]*val[2]),
        Math.floor(((1-s)*wgt[1] + s)*val[1] + (1-s)*wgt[0]*val[0] + (1-s)*wgt[2]*val[2]),
        Math.floor(((1-s)*wgt[2] + s)*val[2] + (1-s)*wgt[1]*val[1] + (1-s)*wgt[0]*val[0]),
        val[3]
    ]
}
export {
    imageToMatrix,
    matrixToImage,
    transform,
    grayScale,
    brightness,
    contrast,
    saturation
}