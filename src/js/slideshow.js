import imagesData from '../assets/**/*.jpg'

export function add (n1, n2) {
  return n1 + n2
}

export const initializeSlideshow = () => {
  const imagePaths = []

  for (const [key, value] of Object.entries(imagesData.images)) {
    console.log(key)
    imagePaths.push(value)
  }

  const slideshowContainer = document.querySelector('.image-container')

  slideshowContainer.querySelector('p').remove()

  const image = document.createElement('img')
  let currentImgIdx = 0

  image.src = imagePaths[currentImgIdx]
  slideshowContainer.appendChild(image)

  const slideToNextImg = () => {
    console.log('current Img Idx', currentImgIdx)
    console.log('current Img Idx', imagePaths)
    currentImgIdx = currentImgIdx === 3 ? 0 : currentImgIdx + 1
    image.src = imagePaths[currentImgIdx]
    slideshowContainer.appendChild(image)
  }

  setInterval(slideToNextImg, 2000)
}
