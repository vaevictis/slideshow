import initialState from './initialState'

const slideshowContainer = document.querySelector('.img-container')
const imageDomElm = document.createElement('img')

const state = {
  slideshowTimerId: 0,
  currentImgIdx: 0,
  ...initialState
}

export const initializeSlideshow = () => {
  imageDomElm.className = 'current-img'

  const loadingMsg = document.querySelector('.loading-msg')
  if (state.imageKeys.length === 0) {
    loadingMsg.innerText = 'no image to display'
    return
  } else {
    loadingMsg.remove()
    slideshowContainer.style.setProperty('display', 'block')
  }

  imageDomElm.src = state.images[state.imageKeys[state.currentImgIdx]].path
  state.images[state.imageKeys[state.currentImgIdx]].viewCounter++
  updateViewCounter()

  slideshowContainer.appendChild(imageDomElm)
}

export const attachHandlersToButtons = () => {
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')
  const playBtn = document.querySelector('.icon-tabler-player-play')
  const pauseBtn = document.querySelector('.icon-tabler-player-pause')

  prevBtn.addEventListener('click', switchToPrevImg)
  nextBtn.addEventListener('click', switchToNextImg)

  const onPlayClick = () => {
    state.slideshowTimerId = setInterval(switchToNextImg, 2000)
    console.log('automated slideshow started', state.slideshowTimerId)

    playBtn.removeEventListener('click', onPlayClick)
    pauseBtn.addEventListener('click', onPauseClick)

    playBtn.setAttribute('stroke', '#666')
    pauseBtn.setAttribute('stroke', '#fff')
  }

  const onPauseClick = () => {
    if (state.slideshowTimerId !== null) {
      clearInterval(state.slideshowTimerId)
      console.log(`automated slideshow with interval ID ${state.slideshowTimerId} stopped`)

      pauseBtn.removeEventListener('click', onPauseClick)
      playBtn.addEventListener('click', onPlayClick)

      playBtn.setAttribute('stroke', '#fff')
      pauseBtn.setAttribute('stroke', '#666')
    }
  }

  playBtn.addEventListener('click', onPlayClick)
}

const switchToNextImg = () => {
  state.currentImgIdx = state.currentImgIdx === state.imageKeys.length - 1 ? 0 : state.currentImgIdx + 1
  changeImg()
}

const switchToPrevImg = () => {
  state.currentImgIdx = state.currentImgIdx === 0 ? state.imageKeys.length - 1 : state.currentImgIdx - 1
  changeImg()
}

const changeImg = () => {
  if (state.imageKeys.length > 0) {
    imageDomElm.src = state.images[state.imageKeys[state.currentImgIdx]].path
    state.images[state.imageKeys[state.currentImgIdx]].viewCounter++
    slideshowContainer.appendChild(imageDomElm)
    updateViewCounter()
  }
}

const updateViewCounter = () => {
  const counter = document.querySelector('.counter')
  counter.innerText = state.images[state.imageKeys[state.currentImgIdx]].viewCounter
}
