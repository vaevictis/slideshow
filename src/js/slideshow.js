import imagesData from '../assets/**/*.jpg'
// import imagesData from '../assets/**/*.png'

const slideshowContainer = document.querySelector('.image-container')
const imageDomElm = document.createElement('img')

const imagePaths = imagesData?.images
  ? Object.values(imagesData.images)
  : []

let currentImgIdx = 0

export const init = () => {
  initializeSlideshow()
  attachHandlersToButtons()
}

const initializeSlideshow = () => {
  const loadingMsg = document.querySelector('.loading-msg')
  if (imagePaths.length === 0) {
    loadingMsg.innerText = 'no image to display'
    return
  } else {
    loadingMsg.remove()
    slideshowContainer.style.setProperty('display', 'block')
  }

  imageDomElm.src = imagePaths.length > 0
    ? imagePaths[currentImgIdx]
    : ''

  slideshowContainer.appendChild(imageDomElm)

  // setInterval(switchToNextImg, 2000)
}

const attachHandlersToButtons = () => {
  const prevBtn = slideshowContainer.querySelector('.prev-btn')
  const nextBtn = slideshowContainer.querySelector('.next-btn')

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
  if (imagePaths.length > 0) {
    imageDomElm.src = imagePaths[currentImgIdx]
    slideshowContainer.appendChild(imageDomElm)
  }
}
