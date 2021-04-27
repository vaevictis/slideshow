import imagesData from '../assets/**/*.jpg'
// import imagesData from '../assets/**/*.png'

const slideshowContainer = document.querySelector('.image-container')
const imageDomElm = document.createElement('img')
imageDomElm.className = 'current-img'
let intervalId

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
}

const attachHandlersToButtons = () => {
  const prevBtn = slideshowContainer.querySelector('.prev-btn')
  const nextBtn = slideshowContainer.querySelector('.next-btn')
  const playBtn = document.querySelector('.icon-tabler-player-play')
  const pauseBtn = document.querySelector('.icon-tabler-player-pause')

  prevBtn.addEventListener('click', switchToPrevImg)
  nextBtn.addEventListener('click', switchToNextImg)

  const onPlayClick = () => {
    intervalId = setInterval(switchToNextImg, 2000)
    console.log('automated slideshow started', intervalId)

    playBtn.removeEventListener('click', onPlayClick)
    pauseBtn.addEventListener('click', onPauseClick)
  }

  const onPauseClick = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      console.log(`automated slideshow with interval ID ${intervalId} stopped`)

      pauseBtn.removeEventListener('click', onPauseClick)
      playBtn.addEventListener('click', onPlayClick)
    }
  }

  playBtn.addEventListener('click', onPlayClick)
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
