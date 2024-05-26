document.addEventListener('DOMContentLoaded', () => {
	/*const form = document.querySelector('.cis-header-search')
	form.addEventListener('submit', e => {
		if (e.submitter != document.getElementById('search-chat')) return
		form.action = 'https://www.ecosia.org/chat'
	})*/
	document.getElementById('chat-search').addEventListener('click', () => {
		const form = document.querySelector('.cis-header-search')
		form.action = 'https://www.ecosia.org/chat'
		form.submit()
		console.log(form)
	})
})
