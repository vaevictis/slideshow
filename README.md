# Programming Exercise - Slideshow

The goal of this exercise is to build a simple slideshow.

The slideshow should:
 - work on desktop, tablets, and mobile
 - display the images provided in the images folder
 - track how many times each picture is viewed (does not need to be stored between refreshes)

## Guidelines

* **Please DO NOT fork this repository with your solution**
* Use any language or frameworks you want
* Only use code that you have license to use
* Don't hesitate to ask us any questions to clarify the project

## Reference Image

![Screenshot](screenshot.png)

## Personal notes

### Installation instructions

I built this project with `Parcel-bundler` because I still wanted a web app bundler but I was interested to test this alternative to Webpack for a long while.
- `cd` into this directory
- `yarn` or `npm install`
- `yarn dev`
- Point your browser to [the local server](localhost:1234)

### Test suite
I've included a small test suite. Simply run `yarn test` or `yarn test:watch`

### Styling choices
- I'm using the indentation-based SASS syntax, only because I think it looks nicer and I'm on my own on this little project. It's so unusual nowadays that I'd normally go with SCSS / curly braces in any kind of project with more than me as a dev.
- My code is making the assumption that an unspecfied number of *.jpg images with any file names are stored in `/src/assets/images` folder. The app behaves gracefully when folder is empty.
- I've used quite liberally CSS ids and classes, trying to assume what would be unique and what may have multiple instances. In the context of a bigger app, I'd most likely use styled-components in a React world, or any solution that helps with writing CSS specific to a component, or even a modular approach to naming CSS selectors.
- The DOM manipulation code is making assumptions in terms of uniqueness of selectors. If there was multiple slideshows, more accurate selectors would need to be used.
- I checked the look and function of my slideshow on Chrome, Safari, Microsoft Edge, Firefox on Mac OS. In Chrome, tested in simualor mode on iphone X and iPad, in both portrait and landscape.
- I've also added a small comment in my SASS file to provide an alternative styling. Instead of maximising the screen real-estate used to display each image, at the cost of having the buttons moving around (I find this behaviour jarring), I'm fixing the width used by the image and let the vertical dimension adapt in order to maintain the image ratio. In that case, portrait-style images will have white bands on the side. Small images will also stretch, but proportionally. Ultimately, I'd have a discussion with a designer to decide what is the best approach for the exact need, before implementing one solution or the other.

### About testing
- I've checked adding a bunch of other random images, the app will crash when modifying the assets folder while it's running. A restart will get it to work with the new images. It was not required that the images folder could be hot-reloaded so I didn't spend time on this behaviour.
- On app load, if the assets folder is empty, the app displays a different message gracefully.
- I quite considerably re-organised my code during development to move from a State object in the Slideshow module to a distinct Store class. This helped decoupling responsibilities (strictly no DOM manipulation in the Store), and as a consequence made writing some unit tests pretty trivial. A side-effect is that I've removed all my attempts to write tests for the Slideshow and Index files. If I were to move forward with this project, I'd likely convert Slideshow to an ES6 class and mock calls to its initialization steps in a test of the entry point. I'd also invest more time figuring out how to mock access to Document and `querySelector`. I've tried to write a small mock HTML section in my tests but kept having issues with calls to `querySelector` on previously created Elements.

In the end, I'd likely end up using some sort of established framework if I were to build a bigger product, and one of my criteria of choice would be its integration with some sort of DOM testing tool. The obvious example coming to mind is Enzyme with React.
