import './assets/styles/main.css'
import './assets/styles/editor.css'

import React from 'react'
import { render } from 'react-dom'
import Audio from './components/Example/Audio'
import Video from './components/Example/Video'
import Image from './components/Example/Image'

const rootNode = document.getElementById('app')

render(
  <>
    <Image />
    <Video />
    <Audio />
  </>,
  rootNode
)
