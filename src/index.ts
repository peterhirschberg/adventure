import {start} from './platform'
import {COLOR} from './adventure'

let fullScreen = false

let body: any
let heading: any
let instructions: any
let links: any
let button: any

document.addEventListener('DOMContentLoaded', () => { 

  // Grab some DOM elements
  body = document.querySelector('body')
  heading = document.querySelector('.heading')
  instructions = document.querySelector('.instructions')
  links = document.querySelectorAll('a')
  button = document.querySelector('button')

  button.onclick = onFullScreen

  // Init the game
  start()

}, false)

function onFullScreen() {
  body.classList.add('fullscreen')
}

export function onRoomColorChanged(color: COLOR) {
  // Make the page elements match the current room color
  let colorstr = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)'
  body.style.color = colorstr
  instructions.style.border = '1px solid ' + colorstr
  links.forEach((link:any) => {
    link.style.color = colorstr
  })
  button.style.color = colorstr
  button.style.border = '2px solid ' + colorstr
}
