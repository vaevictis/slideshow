import imagesData from '../assets/**/*.jpg'
// import imagesData from '../assets/**/*.png'

const slideshowContainer = document.querySelector('.image-container')
const imageDomElm = document.createElement('img')
imageDomElm.className = 'current-img'
let slideshowTimerId

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

  imageDomElm.src = imagePaths[currentImgIdx]
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
    slideshowTimerId = setInterval(switchToNextImg, 2000)
    console.log('automated slideshow started', slideshowTimerId)

    playBtn.removeEventListener('click', onPlayClick)
    pauseBtn.addEventListener('click', onPauseClick)

    playBtn.setAttribute('stroke', '#666')
    pauseBtn.setAttribute('stroke', '#fff')
  }

  const onPauseClick = () => {
    if (slideshowTimerId !== null) {
      clearInterval(slideshowTimerId)
      console.log(`automated slideshow with interval ID ${slideshowTimerId} stopped`)

      pauseBtn.removeEventListener('click', onPauseClick)
      playBtn.addEventListener('click', onPlayClick)

      playBtn.setAttribute('stroke', '#fff')
      pauseBtn.setAttribute('stroke', '#666')
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
