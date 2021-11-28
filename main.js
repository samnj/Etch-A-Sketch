'use strict'

const gridContainer = document.querySelector('.grid-container')
const pencilBtn = document.querySelector('.pencil-button')
const pencilColor = document.querySelector('#pencil-color')
const bgColor = document.querySelector('#bg-color')
const eraserBtn = document.querySelector('.eraser-button')
const toggleGridBtn = document.querySelector('#toggle-grid-borders')
const clearGridBtn = document.querySelector('.clear-grid-button')
const gridSizeSlider = document.querySelector('#grid-slider')
const label = document.querySelector('#grid-slider-label')

const tools = ['pencil', 'eraser']
let tool = tools[0]

pencilBtn.addEventListener('click', () => { tool = tools[0] })
eraserBtn.addEventListener('click', () => { tool = tools[1] })
toggleGridBtn.addEventListener('click', () => {
  if (toggleGridBtn.value === 'on') {
    toggleGridBtn.value = 'off'
    hideGridBorders()
  } else {
    toggleGridBtn.value = 'on'
    showGridBorders()
  }
})

bgColor.addEventListener('input', () => {
  setTimeout(() => {
    for (let i = 0; i < gridContainer.children.length; i++) {
      if (!(gridContainer.children[i].classList.contains('painted'))) {
        gridContainer.children[i].style.backgroundColor = bgColor.value
      }
    }
  }, 500)
})

gridSizeSlider.addEventListener('change', () => {
  removeChildren(gridContainer)
  const gridSize = gridSizeSlider.value
  createGrid(gridSize)
  label.textContent = `Grid size: ${gridSize} X ${gridSize}`
})

clearGridBtn.addEventListener('click', clearGrid)

function createGrid (gridSize) {
  for (let i = 0; i < gridSize ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('box')
    div.style.backgroundColor = bgColor.value
    gridContainer.append(div)
  }
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  addGridListeners()
  if (toggleGridBtn.value === 'on') {
    showGridBorders()
  }
}

function addGridListeners () {
  const boxes = document.querySelectorAll('.box')
  boxes.forEach(box => box.addEventListener('mousedown', (e) => {
    e.preventDefault()
    applyToolAction(e, box)
  }))
  boxes.forEach(box => box.addEventListener('mouseenter', (e) => {
    applyToolAction(e, box)
  }))
}

function applyToolAction (e, box) {
  if (e.buttons === 1) {
    if (tool === 'pencil') {
      box.style.backgroundColor = pencilColor.value
      box.classList.add('painted')
    } else if (tool === 'eraser') {
      box.style.backgroundColor = bgColor.value
      box.classList.remove('painted')
    }
  }
}

function removeChildren (parentElement) {
  let child = parentElement.firstElementChild
  while (child) {
    parentElement.removeChild(child)
    child = parentElement.firstElementChild
  }
}

function clearGrid () {
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].style.backgroundColor = bgColor.value
    gridContainer.children[i].classList.remove('painted')
  }
}

function showGridBorders () {
  const borderStyle = '0.01rem solid rgba(161, 159, 159, 0.4)'
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].style.borderRight = borderStyle
    gridContainer.children[i].style.borderBottom = borderStyle
    if (i < gridSizeSlider.value) {
      gridContainer.children[i].style.borderTop = borderStyle
      if (i === 0) {
        gridContainer.children[i].style.borderLeft = borderStyle
      }
    } else if (i % gridSizeSlider.value === 0) {
      gridContainer.children[i].style.borderLeft = borderStyle
    }
  }
}

function hideGridBorders () {
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].style.border = 'none'
  }
}

createGrid(16)
