import imagesFolder from '../assets/**/*.jpg'
import Store from './Store'

const slideshow = document.querySelector('#slideshow')
const bottomNav = document.querySelector('#bottom-nav')
const imgDomElm = document.createElement('img')
const imgContainer = slideshow.querySelector('.img-container')
const domCounter = bottomNav.querySelector('.counter')

const store = new Store(imagesFolder)

export const initializeSlideshow = () => {
  imgDomElm.className = 'current-img'
  const loadingMsg = slideshow.querySelector('.loading-msg')

  if (store.imageKeys.length === 0) {
    loadingMsg.innerText = 'no image to display'
    return
  } else {
    loadingMsg.remove()
    imgContainer.style.setProperty('display', 'block')
  }

  store.increaseViewCounterForCurrentImg()
  updateDomViewCounter(store.getCurrentImgViewCounter())
  updateDomImg(store.getCurrentImgPath())
}

export const attachHandlersToButtons = () => {
  const prevBtn = slideshow.querySelector('.prev-btn')
  const nextBtn = slideshow.querySelector('.next-btn')
  const playBtn = bottomNav.querySelector('.icon-tabler-player-play')
  const pauseBtn = bottomNav.querySelector('.icon-tabler-player-pause')

  prevBtn.addEventListener('click', switchToPrevImg)
  nextBtn.addEventListener('click', switchToNextImg)

  const onPlayClick = () => {
    store.setSlideshowTimerId(setInterval(switchToNextImg, 2000))
    console.log('automated slideshow started', store.getSlideshowTimerId())

    playBtn.removeEventListener('click', onPlayClick)
    pauseBtn.addEventListener('click', onPauseClick)

    playBtn.setAttribute('stroke', '#666')
    pauseBtn.setAttribute('stroke', '#fff')
  }

  const onPauseClick = () => {
    if (store.getSlideshowTimerId() !== null) {
      clearInterval(store.getSlideshowTimerId())
      console.log(`automated slideshow with interval ID ${store.getSlideshowTimerId()} stopped`)

      pauseBtn.removeEventListener('click', onPauseClick)
      playBtn.addEventListener('click', onPlayClick)

      playBtn.setAttribute('stroke', '#fff')
      pauseBtn.setAttribute('stroke', '#666')
    }
  }

  playBtn.addEventListener('click', onPlayClick)
}

const switchToNextImg = () => {
  store.shiftToNextImg()
  updateDomViewCounter(store.getCurrentImgViewCounter())
  updateDomImg(store.getCurrentImgPath())
}

const switchToPrevImg = () => {
  store.shiftToPreviousImg()
  updateDomViewCounter(store.getCurrentImgViewCounter())
  updateDomImg(store.getCurrentImgPath())
}

const updateDomImg = (imgPath) => {
  imgDomElm.src = imgPath
  imgContainer.appendChild(imgDomElm)
}

const updateDomViewCounter = (counterValue) => {
  domCounter.innerText = counterValue
}
