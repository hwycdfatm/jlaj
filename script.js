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
	document.querySelector('html').classList.remove('dark')
	document.querySelector('html').classList.add('light')
	document.querySelector('.toggle').classList.remove('active')
}

function on() {
	document.querySelector('html').classList.remove('light')
	document.querySelector('html').classList.add('dark')
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
