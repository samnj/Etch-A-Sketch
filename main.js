'use strict'

const gridContainer = document.querySelector('.grid-container')

const pencilBtn = document.querySelector('.pencil-button')
const eraserBtn = document.querySelector('.eraser-button')
const clearGridBtn = document.querySelector('.clear-grid-button')
const gridSizeSlider = document.querySelector('#grid-slider')
const label = document.querySelector('label')

const tools = ['pencil', 'eraser']
let tool = tools[0]

pencilBtn.addEventListener('click', () => tool = tools[0])
eraserBtn.addEventListener('click', () => tool = tools[1])

gridSizeSlider.addEventListener('change', (e) => {
  removeChildren(gridContainer)
  createGrid(e.target.value)
  const gridSize = gridSizeSlider.value
  label.textContent = `Grid size: ${gridSize} X ${gridSize}`
})

clearGridBtn.addEventListener('click', clearGrid)

function createGrid (gridSize) {
  for (let i = 0; i < gridSize ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('box')
    gridContainer.append(div)
  }
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

  addGridListeners()
}

function addGridListeners () {
  const boxes = document.querySelectorAll('.box')
  boxes.forEach(box => box.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (tool === 'pencil') {
      box.classList.add('painted')
    } else if (tool === 'eraser') {
      box.classList.remove('painted')
    }
    
  }))
  
  boxes.forEach(box => box.addEventListener('mouseenter', (e) => {
    if (e.buttons > 0) {
      if (tool === 'pencil') {
        box.classList.add('painted')
      } else if (tool === 'eraser') {
        box.classList.remove('painted')
      }
    }
  }))
}

function removeChildren (parentElement) {
  let child = parentElement.firstElementChild
  while (child) {
    parentElement.removeChild(child)
    child = parentElement.firstElementChild
  }
}

function clearGrid () {
  const gridChildren = gridContainer.children
  for (let i = 0; i < gridChildren.length; i++) {
    gridChildren[i].classList.remove('painted')
  }
}

createGrid(16)

// TO DO
// const boxes and const gridChildren are the same
// fix repeating code for mousedown and mouseenter events
// improve tool picker

// NEAR FUTURE FEATURES
// level 1
// pencil color options 
// change background color
// keyboard shortcuts
// eraser/pencil size (relative to grid size)
// color picker 
// grid lines toggle
// rainbow mode 
// shading/lighting

// level 2
// improve mouse tracking for fast movements
// fill unpainted squares
// scale drawing