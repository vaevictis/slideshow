import imagesFolder from '../assets/**/*.jpg'
// import imagesFolder from '../assets/**/*.png'

const images = {}
let imageKeys

if (imagesFolder?.images) {
  imageKeys = Object.keys(imagesFolder.images)

  for (const [key, value] of Object.entries(imagesFolder.images)) {
    images[key] = {
      path: value,
      viewCounter: 0
    }
  }
} else {
  imageKeys = []
}

const initialState = {
  imageKeys: imageKeys,
  images: images
}

export default initialState
