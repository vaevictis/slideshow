import imagesData from '../assets/**/*.jpg'

export function add (n1, n2) {
  return n1 + n2
}

const images = imagesData.images

export const initializeSlideshow = () => {
  for (const [key, value] of Object.entries(imagesData.images)) {
    console.log('key', key)
    console.log('value', value)
  }

  const slideshowContainer = document.querySelector('#slideshow')
  const image = document.createElement('img')
  image.src = images[Object.keys(images)[0]]
  slideshowContainer.querySelector('p').remove()
  slideshowContainer.appendChild(image)
}
