let slides = {
	init: function () {
		slides.cell = document.querySelector('.grid-cell[data-label="CampusSlides"]');
		slides.form = document.createElement('FORM');
		slides.form.classList.add('grid-cell', 'grid-cell-vertical', 'static', 'slides-form');
		slides.form.action = 'https://gcm.schule/slides/submit/';
		slides.form.method = 'POST';
		slides.form.target = '_blank';
		slides.form.innerHTML = `
				<h2>CampusSlides</h2>
				<textarea class="cisui-textarea" name="slides-md"></textarea>
				<button type="submit" class="cisui-button">slide it!</button>`;

		slides.cell.parentNode.replaceChild(slides.form, slides.cell);
	}
};

document.addEventListener('DOMContentLoaded', slides.init);
