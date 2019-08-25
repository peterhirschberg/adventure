import * as CONSTS from './constants'
import {Adventure_Run} from './adventure'
import {onRoomColorChanged} from './index'
import {COLOR} from './adventure'

let canvas : HTMLCanvasElement
let ctx : any

let keyReset = false
let keySelect = false
let keyLeft = false
let keyRight = false
let keyUp = false
let keyDown = false
let keyFire = false

let soundPickup: any
let soundPutdown: any
let soundRoar: any
let soundDragonDie: any
let soundEaten: any
let soundWon: any

let lastColor: COLOR = {r:0, g:0, b:0}

export function start() {

  // Set up the sounds
  soundPickup = new Audio('./sounds/pickup.wav')
  soundPutdown = new Audio('./sounds/putdown.wav')
  soundRoar = new Audio('./sounds/roar.wav')
  soundDragonDie = new Audio('./sounds/dragondie.wav')
  soundEaten = new Audio('./sounds/eaten.wav')
  soundWon = new Audio('./sounds/won.wav')

  // preload the sounds
  soundPickup.addEventListener('loadeddata', () => {}) 
  soundPutdown.addEventListener('loadeddata', () => {}) 
  soundRoar.addEventListener('loadeddata', () => {}) 
  soundDragonDie.addEventListener('loadeddata', () => {}) 
  soundEaten.addEventListener('loadeddata', () => {}) 
  soundWon.addEventListener('loadeddata', () => {}) 

  // Set up the canvas for drawing
  canvas = <HTMLCanvasElement> document.getElementById("canvas")
  ctx = canvas.getContext("2d")
  ctx.imageSmoothingEnabled = false

  // The game expects a bottom up buffer, so we flip the orientation here
  ctx.transform(1, 0, 0, -1, 0, canvas.height)

  // Watch for keypresses
  const keyCodeUp = 38
  const keyCodeDown = 40
  const keyCodeLeft = 37
  const keyCodeRight = 39
  const keyCodeSpace = 32
  window.onkeydown = e => {
    switch(e.key) {
      case '1':
        keyReset = true
        break
      case '2':
        keySelect = true
        break
    }
    switch(e.keyCode) {
      case keyCodeUp:
        keyUp = true
        break
      case keyCodeDown:
        keyDown = true
        break
      case keyCodeLeft:
        keyLeft = true
        break
      case keyCodeRight:
        keyRight = true
        break
      case keyCodeSpace:
        keyFire = true
        break
    }
  }
  window.onkeyup = e => {
    switch(e.key) {
      case '1':
        keyReset = false
        break
      case '2':
        keySelect = false
        break
    }
    switch(e.keyCode) {
      case keyCodeUp:
        keyUp = false
        break
      case keyCodeDown:
        keyDown = false
        break
      case keyCodeLeft:
        keyLeft = false
        break
      case keyCodeRight:
        keyRight = false
        break
      case keyCodeSpace:
        keyFire = false
        break
    }
  }

  setInterval(() => {
    Adventure_Run()
  },1000/CONSTS.ADVENTURE_FPS)

}

// Shared interfaces

export interface JOYSTICK {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
  fire: boolean
}

// These are called from the game code

export function Platform_PaintPixel(r: number, g: number, b: number, x: number, y: number, width: number, height: number) {

  width = width ? width : 1
  height = height ? height : 1

  y -= CONSTS.ADVENTURE_OVERSCAN
 
  ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)'
  ctx.fillRect(x, y, width, height)

}

export function Platform_ReadJoystick(joystick: JOYSTICK) {
  joystick.left = keyLeft
  joystick.up = keyUp
  joystick.right = keyRight
  joystick.down = keyDown
  joystick.fire = keyFire
}

export function Platform_ReadSelectSwitch(): boolean {
  return keySelect
}

export function Platform_ReadResetSwitch(): boolean {
  return keyReset
}

export function Platform_ReadDifficultySwitches() : any {
  return {
    left: 1,
    right: 0
  }
}

export function Platform_MakeSound(sound: number) {
  switch (sound) {
    case CONSTS.SOUND_PICKUP:
      soundPickup.play()
      break
    case CONSTS.SOUND_PUTDOWN:
      soundPutdown.play()
      break
    case CONSTS.SOUND_ROAR:
      soundRoar.play()
      break
    case CONSTS.SOUND_DRAGONDIE:
      soundRoar.pause()
      soundRoar.currentTime = 0.0
      soundDragonDie.play()
      break
    case CONSTS.SOUND_EATEN:
      soundEaten.play()
      break
    case CONSTS.SOUND_WON:
      soundWon.play()
      break
  }
}

export function Platform_Random() : number {
  return Math.random()
}

export function Platform_RoomColor(color: COLOR) {
  // Hook and debounce room color changes
  if (color != lastColor) {
    lastColor = color
    onRoomColorChanged(color)
  }
}
