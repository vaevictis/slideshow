import Store from '../../js/Store'

describe('Store', () => {
  let imagesFolder = {}
  let store, mockImages, mockImgKeys

  beforeAll(() => {
    imagesFolder = {
      images: {
        img1: '/path_to_img1.jpg',
        img2: '/path_to_img2.jpg',
        img3: '/path_to_img3.jpg'
      }
    }
  })

  beforeEach(() => {
    store = new Store(imagesFolder)

    mockImgKeys = ['img1', 'img2', 'img3']
    mockImages = {
      img1: {
        path: '/path_to_img1.jpg',
        viewCounter: 0
      },
      img2: {
        path: '/path_to_img2.jpg',
        viewCounter: 0
      },
      img3: {
        path: '/path_to_img3.jpg',
        viewCounter: 0
      }
    }
  })

  describe('store initialization', () => {
    it('ensures the store gets initialized correctly', () => {
      expect(store.currentImgIdx).toBe(0)
      expect(store.slideshowTimerId).toBeNull()
      expect(store.imageKeys).toEqual(mockImgKeys)
      expect(store.images).toEqual(mockImages)
    })
  })

  describe('when the next image button is pressed', () => {
    it('increments various elements', () => {
      store.shiftToNextImg()

      expect(store.getCurrentImgViewCounter()).toBe(1)
      expect(store.getCurrentImgIdx()).toBe(1)
      expect(store.currentImg()).toEqual({
        path: '/path_to_img2.jpg',
        viewCounter: 1
      })
    })
  })

  describe('when the automated slideshow button is pressed', () => {
    it('keeps track of the interval ID set by the browser', () => {
      store.setSlideshowTimerId(123)

      expect(store.getSlideshowTimerId()).toBe(123)
    })
  })

  describe('when images have been viewed in a random order', () => {
    it('keeps track of the view count of images properly', () => {
      store.increaseViewCounterForCurrentImg()
      store.shiftToNextImg()
      store.shiftToNextImg()
      store.shiftToNextImg()
      store.shiftToPreviousImg()
      store.shiftToNextImg()
      store.shiftToPreviousImg()
      store.shiftToPreviousImg()

      expect(store.images).toEqual({
        img1: {
          path: '/path_to_img1.jpg',
          viewCounter: 3
        },
        img2: {
          path: '/path_to_img2.jpg',
          viewCounter: 2
        },
        img3: {
          path: '/path_to_img3.jpg',
          viewCounter: 3
        }
      })
    })
  })
})
