# React Media Editor

#### React components library to edit Images and Video using canvas.

[![npm version](https://badge.fury.io/js/react-media-editor.svg)](https://badge.fury.io/js/react-media-editor)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/morzhanov/react-media-editor/issues)
[![HitCount](http://hits.dwyl.io/morzhanov/react-audio-comments.svg)](http://hits.dwyl.io/morzhanov/react-media-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://i.imgur.com/e3B8bRP.png" alt="logo" />

## Description

Use this library to add image/video editor to you React application.

This library contains drawing tools which you can use to draw graphical shapes on you image or video sources. Package contains ImageEditor and VideoEditor components.

## Installation


NPM package:
```
yarn i react-media-editor
```

Also you can modify project files directly, project built using <a href="https://rollupjs.org/guide/en">RollupJS</a> module bundler.

#### Example

To run example: 

* go to /example folder
* yarn i
* yarn start
* open <a href="localhost:3000">localhost:3000</a>

## Demo

You can review how to use ImageEditor on codesandbox:

[![Edit 5349lln724](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5349lln724?view=preview)

## Usage

Here is an example how to use VideoEditor compoent within you application:

```
import React from 'react'
import { SketchPicker } from 'react-color'
import { VideoEditor } from 'react-media-editor'

const Video = () => (
  <div className="page-wrapper editor">
    <div className="container">
      <VideoEditor
        colorPicker={SketchPicker}
        src="https://your.video.mp4"
      />
    </div>
  </div>
)

export default Video
```

Result: [Imgur](https://i.imgur.com/e3B8bRP.png)

Example using ImageEditor:

```
import React from 'react'
import { SketchPicker } from 'react-color'
import { ImageEditor } from 'react-media-editor'
import ExampleImage from '../assets/img/example.png'

const Image = () => (
  <div className="page-wrapper editor">
    <div className="container">
      <ImageEditor colorPicker={SketchPicker} src={ExampleImage} />
    </div>
  </div>
)

export default Image
```

Result: [Imgur](https://i.imgur.com/hER5fN8.png)


#### Notice

If you want to enable color change feature you should add <a href="https://casesandberg.github.io/react-color/">react-color</a> package to your project, and then pass it's component as colorPainter prop to Editor. Example:

```
...
import { SketchPicker } from 'react-color' // we will use SketchPicker
...

// somwhere in the React render() method
 <VideoEditor
   colorPicker={SketchPicker}
   src="https://your.video.mp4"
 />
...
```

### ImageEditor and VideoEditor props

<b>colorPicker</b> - react-color component to enable color pick feature.

<b>src</b> - image or video source.

## Main Technologies and libraries

- <a href="https://reactjs.org/">React</a>
- <a href="https://casesandberg.github.io/react-color/">react-color</a>
- <a href="https://rollupjs.org">Rollup.JS</a>
- <a href="https://webpack.js.org/">Webpack 4</a>
- <a href="https://eslint.org/">ESLint</a>
- <a href="https://github.com/prettier/prettier">Prettier</a>
- <a href="https://babeljs.io/">Babel</a>

## More

If you would like to edit images or video files please take a look on <a href="https://github.com/morzhanov/react-media-editor">react-media-editor</a> library.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

Vlad Morzhanov

## License

#### (The MIT License)

Copyright (c) 2018 Vlad Morzhanov.
You can review license in the LICENSE file.
