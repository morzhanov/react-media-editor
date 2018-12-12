import './assets/styles/main.css'
import React from 'react'
import { render } from 'react-dom'
import Video from './components/Video'
import Image from './components/Image'

const rootNode = document.getElementById('app')

render(
  <>
    <Image />
    <Video />
  </>,
  rootNode
)
