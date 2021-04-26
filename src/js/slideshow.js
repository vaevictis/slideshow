import imagesData from '../assets/**/*.jpg'

const slideshowContainer = document.querySelector('.image-container')
const imagePaths = Object.values(imagesData.images)
const image = document.createElement('img')

let currentImgIdx = 0

export const init = () => {
  initializeSlideshow()
  attachHandlersToButtons()
}

const initializeSlideshow = () => {
  slideshowContainer.querySelector('.loading-msg').remove()

  image.src = imagePaths[currentImgIdx]

  slideshowContainer.appendChild(image)

  // setInterval(switchToNextImg, 2000)
}

const attachHandlersToButtons = () => {
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')

  prevBtn.addEventListener('click', event => {
    switchToPrevImg()
  })

  nextBtn.addEventListener('click', event => {
    switchToNextImg()
  })
}

const switchToNextImg = () => {
  currentImgIdx = currentImgIdx === 3 ? 0 : currentImgIdx + 1
  changeImg()
}

const switchToPrevImg = () => {
  currentImgIdx = currentImgIdx === 0 ? 3 : currentImgIdx - 1
  changeImg()
}

const changeImg = () => {
  image.src = imagePaths[currentImgIdx]
  slideshowContainer.appendChild(image)
}
