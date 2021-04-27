import initialState from './initialState'

const slideshow = document.querySelector('#slideshow')
const imgContainer = slideshow.querySelector('.img-container')
const bottomNav = document.querySelector('#bottom-nav')
const imgDomElm = document.createElement('img')

const state = {
  slideshowTimerId: 0,
  currentImgIdx: 0,
  ...initialState
}

export const initializeSlideshow = () => {
  imgDomElm.className = 'current-img'
  const loadingMsg = slideshow.querySelector('.loading-msg')

  if (state.imageKeys.length === 0) {
    loadingMsg.innerText = 'no image to display'
    return
  } else {
    loadingMsg.remove()
    imgContainer.style.setProperty('display', 'block')
  }

  imgDomElm.src = state.images[state.imageKeys[state.currentImgIdx]].path
  state.images[state.imageKeys[state.currentImgIdx]].viewCounter++
  updateViewCounter()

  imgContainer.appendChild(imgDomElm)
}

export const attachHandlersToButtons = () => {
  const prevBtn = slideshow.querySelector('.prev-btn')
  const nextBtn = slideshow.querySelector('.next-btn')
  const playBtn = bottomNav.querySelector('.icon-tabler-player-play')
  const pauseBtn = bottomNav.querySelector('.icon-tabler-player-pause')

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
    imgDomElm.src = state.images[state.imageKeys[state.currentImgIdx]].path
    state.images[state.imageKeys[state.currentImgIdx]].viewCounter++
    imgContainer.appendChild(imgDomElm)
    updateViewCounter()
  }
}

const updateViewCounter = () => {
  const counter = bottomNav.querySelector('.counter')
  counter.innerText = state.images[state.imageKeys[state.currentImgIdx]].viewCounter
}
