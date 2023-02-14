const sepcial = '2022-09-12 14:29:18'

const timeCount = new Date().getTime() - new Date(sepcial).getTime()

let dayCount = Math.floor(Math.floor(timeCount / 3600) / 24 / 1000)

setInterval(() => {
	const timeCountUp = Math.floor(
		(new Date().getTime() - new Date(sepcial).getTime()) / 1000
	)
	flipAllCards(timeCountUp)
}, 250)

function flipAllCards(time) {
	const seconds = time % 60
	const minutes = Math.floor(time / 60) % 60
	const hours = Math.floor(time / 3600) - dayCount * 24
	if (hours === 24) {
		dayCount++
		changeDay()
	}
	flip(document.querySelector('[data-hours-tens]'), Math.floor(hours / 10))
	flip(document.querySelector('[data-hours-ones]'), hours % 10)
	flip(document.querySelector('[data-minutes-tens]'), Math.floor(minutes / 10))
	flip(document.querySelector('[data-minutes-ones]'), minutes % 10)
	flip(document.querySelector('[data-seconds-tens]'), Math.floor(seconds / 10))
	flip(document.querySelector('[data-seconds-ones]'), seconds % 10)
}

function flip(flipCard, newNumber) {
	const topHalf = flipCard.querySelector('.top')
	const startNumber = parseInt(topHalf.textContent)
	if (newNumber === startNumber) return

	const bottomHalf = flipCard.querySelector('.bottom')
	const topFlip = document.createElement('div')
	topFlip.classList.add('top-flip')
	const bottomFlip = document.createElement('div')
	bottomFlip.classList.add('bottom-flip')

	top.textContent = startNumber
	bottomHalf.textContent = startNumber
	topFlip.textContent = startNumber
	bottomFlip.textContent = newNumber

	topFlip.addEventListener('animationstart', (e) => {
		topHalf.textContent = newNumber
	})
	topFlip.addEventListener('animationend', (e) => {
		topFlip.remove()
	})
	bottomFlip.addEventListener('animationend', (e) => {
		bottomHalf.textContent = newNumber
		bottomFlip.remove()
	})
	flipCard.append(topFlip, bottomFlip)
}

function changeDay() {
	const day = document.querySelector('#date')
	day.innerText = dayCount
}

changeDay()

const toggle = document.querySelector('.toggle')
let theme

function off() {
	document.documentElement.classList.remove('dark')
	document.documentElement.classList.add('light')
	document.querySelector('.toggle').classList.remove('active')
}

function on() {
	document.documentElement.classList.remove('light')
	document.documentElement.classList.add('dark')
	document.querySelector('.toggle').classList.add('active')
}

;(() => {
	if (
		localStorage.getItem('theme') === null ||
		localStorage.getItem('theme') === 'false'
	) {
		localStorage.setItem('theme', false)
		theme = false
		off()
	} else {
		theme = JSON.parse(localStorage.getItem('theme'))
		on()
	}
})()

toggle.onclick = () => {
	if (theme) {
		localStorage.setItem('theme', false)
		theme = false
		off()
	} else {
		localStorage.setItem('theme', true)
		theme = true
		on()
	}
}

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
})

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('orientationchange', function () {
	if (window.orientation === 90 || window.orientation === -90) {
		document.documentElement.classList.add('landscape')
	} else {
		document.documentElement.classList.remove('landscape')
	}
})

document.addEventListener('touchstart', handleTouchStart, false)
document.addEventListener('touchmove', handleTouchMove, false)

let xDown = null
let yDown = null

function getTouches(evt) {
	return evt.touches || evt.originalEvent.touches
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0]
	xDown = firstTouch.clientX
	yDown = firstTouch.clientY
}

const card = document.querySelector('.wrapper')

function flipCard(direct) {
	// if card has flip
	if (card.classList.contains('flip')) {
		card.className = card.className.replace(/flip.*/g, '')
	} else {
		card.classList.add('flip', `flip-${direct}`)
	}
}

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return
	}

	var xUp = evt.touches[0].clientX
	var yUp = evt.touches[0].clientY

	var xDiff = xDown - xUp
	var yDiff = yDown - yUp

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		flipCard('horizontal')
	} else {
		flipCard('vertical')
	}

	xDown = null
	yDown = null
}
