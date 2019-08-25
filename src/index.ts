import {start} from './platform'
import {COLOR} from './adventure'

let body: any
let instructions: any
let links: any

document.addEventListener('DOMContentLoaded', () => { 

  // Grab some DOM elements
  body = document.querySelector('body')
  instructions = document.querySelector('.instructions')
  links = document.querySelectorAll('a')

  // Init the game
  start()

}, false)

export function onRoomColorChanged(color: COLOR) {
  // Make the page elements match the current room color
  let colorstr = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)'
  body.style.color = colorstr
  instructions.style.border = '1px solid ' + colorstr
  links.forEach((link:any) => {
    link.style.color = colorstr
  })
}
