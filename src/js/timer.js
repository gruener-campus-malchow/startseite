const timer = {
  init: function () {
    timer.cell = document.querySelector('.grid-cell[data-label="Timer"]');
    timer.cell.classList.add('timer', 'static');
    
    timer.iframe = document.createElement('IFRAME');
    timer.iframe.className = timer.cell.className;
    timer.iframe.src = 'https://gcm.schule/timer/#embed';
    timer.iframe.allowFullscreen = true;
    timer.cell.replaceWith(timer.iframe);
  }
};

document.addEventListener('DOMContentLoaded', timer.init);
