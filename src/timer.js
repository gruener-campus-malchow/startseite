'use strict';

let timer = {
  init: function () {
    timer.cell = document.querySelector('.grid-cell[data-label="Timer"]');
    timer.cell.classList.add('timer');
    timer.cell.classList.add('static');
    timer.cell.innerHTML = '';

    timer.elements = [];
    timer.elements.timeContainer = createElement('DIV', 'time-container');
    timer.cell.appendChild(timer.elements.timeContainer);

    timer.elements.hourInput = createElement('DIV', 'time-input hour', '00');
    timer.elements.minuteInput = createElement('DIV', 'time-input minute', '10');
    timer.elements.secondInput = createElement('DIV', 'time-input second', '00');
    timer.elements.timeContainer.appendChild(timer.elements.hourInput);
    timer.elements.timeContainer.appendChild(document.createTextNode(':'));
    timer.elements.timeContainer.appendChild(timer.elements.minuteInput);
    timer.elements.timeContainer.appendChild(document.createTextNode(':'));
    timer.elements.timeContainer.appendChild(timer.elements.secondInput);

    timer.elements.buttonContainer = createElement('DIV', 'button-container');
    timer.cell.appendChild(timer.elements.buttonContainer);

    timer.elements.secondaryButton = createElement('BUTTON', 'button', 'löschen');
    timer.elements.primaryButton = createElement('BUTTON', 'button primary', 'start');
    timer.elements.buttonContainer.appendChild(timer.elements.secondaryButton);
    timer.elements.buttonContainer.appendChild(timer.elements.primaryButton);

    timer.elements.primaryButton.onclick = timer.start;
    timer.elements.secondaryButton.onclick = timer.clear;

    document.body.addEventListener('click', timer.handleClick);
    document.body.addEventListener('keydown', timer.handleKeydown);


    function createElement(tagName, classList, content) {
      let element = document.createElement(tagName);
      element.setAttribute('class', classList);
      element.innerHTML = content || '';
      return element;
    }
  },


  updateButtons: function (primaryText, primaryAction, secondaryText, secondaryAction) {
    timer.elements.primaryButton.innerText = primaryText;
    timer.elements.secondaryButton.innerText = secondaryText;
    if (primaryAction) timer.elements.primaryButton.onclick = primaryAction;
    if (secondaryAction) timer.elements.secondaryButton.onclick = secondaryAction;
  },


  start: function () {
    timer.updateButtons('pause', timer.stop, 'abbrechen', timer.clear);

    timer.timeout = window.setInterval(timer.update, 1000);
    timer.update();
    timer.cell.classList.add('running');
  },

  stop: function () {
    timer.updateButtons('weiter', timer.start, 'abbrechen', timer.clear);

    window.clearInterval(timer.timeout);
    timer.cell.classList.remove('running');
  },

  clear: function () {
    timer.updateButtons('start', timer.start, 'löschen', timer.clear);
    timer.elements.primaryButton.disabled = false;

    window.clearInterval(timer.timeout);
    timer.cell.classList.remove('running');
    timer.cell.classList.remove('done');

    timer.elements.hourInput.innerText = '00';
    timer.elements.minuteInput.innerText = '10';
    timer.elements.secondInput.innerText = '00';
  },

  end: function () {
    timer.elements.secondaryButton.innerText = 'fertig';
    timer.elements.primaryButton.disabled = true;

    window.clearInterval(timer.timeout);
    timer.cell.classList.add('done');
  },

  update: function () {
    let currentHours = parseInt(timer.elements.hourInput.innerText);
    let currentMinutes = parseInt(timer.elements.minuteInput.innerText);
    let currentSeconds = parseInt(timer.elements.secondInput.innerText);

    currentSeconds --;
    if (currentSeconds < 0) {
      currentSeconds = 59;
      currentMinutes --;
      if (currentMinutes < 0) {
        currentMinutes = 59;
        currentHours --;
        if (currentHours < 0) {
          currentHours = 0;
          currentMinutes = 0;
          currentSeconds = 0;
          timer.end();
        }
      }
    }

    timer.elements.hourInput.innerText = (currentHours + '').padStart(2, '0');
    timer.elements.minuteInput.innerText = (currentMinutes + '').padStart(2, '0');
    timer.elements.secondInput.innerText = (currentSeconds + '').padStart(2, '0');
  },


  handleClick: function (e) {
    let previouslyFocussed = timer.cell.querySelector('.time-input.focussed');
    if (previouslyFocussed) {
      previouslyFocussed.classList.remove('focussed');
    }
    if (e.target.classList.contains('time-input') && !timer.cell.classList.contains('running')) {
      e.target.classList.add('focussed');
    }
  },

  handleKeydown: function (e) {
    let focussedInput = timer.cell.querySelector('.time-input.focussed');
    if (focussedInput) {
      if (e.key.match('^[0-9]$')) {
        if (focussedInput.innerText.charAt(0) === '0') {
          focussedInput.innerText = focussedInput.innerText.substring(1);
        } else {
          focussedInput.innerText = '0';
        }
        focussedInput.innerText += e.key;

        if (focussedInput.innerText.charAt(0) !== '0') {
          timer.ui.focusNext(focussedInput);
        }
      } else if (e.keyCode == 8) {
        if (focussedInput.innerText === '00') {
          timer.ui.focusPrevious(focussedInput);
        } else {
          focussedInput.innerText = ('0' + focussedInput.innerText).substring(0, 2);
        }
      } else if (e.keyCode == 9) {
        if (e.shiftKey) {
          if (timer.ui.focusPrevious(focussedInput)) e.preventDefault();
        } else {
          if (timer.ui.focusNext(focussedInput)) e.preventDefault();
        }
      } else if (e.keyCode == 37) {
        timer.ui.focusPrevious(focussedInput);
      } else if (e.keyCode == 39) {
        timer.ui.focusNext(focussedInput);
      } else if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    }
  },


  ui: {
    focusPrevious: function (input) {
      let previousInput = input.previousElementSibling || input;
      input.classList.remove('focussed');
      previousInput.classList.add('focussed');
      return input != previousInput;
    },
    focusNext: function (input) {
      let nextInput = input.nextElementSibling || input;
      input.classList.remove('focussed');
      nextInput.classList.add('focussed');
      return input != nextInput;
    }
  }
};

document.addEventListener('DOMContentLoaded', timer.init);



/* timer */
/*
//document.querySelector('.timer').addEventListener('click', initTimer);
initTimer();

function initTimer() {

  let fullScreenButton = timerCell.querySelector('.button.fullscreen');
  exitFullScreen();
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      exitFullScreen();
    }
  });

  //////// MARK: timer ////////

  function startTimer() { }

  function pauseTimer() {
  }

  function resumeTimer() {
  }

  function clearTimer() {
  }

  function endTimer() {
  }

  function updateTimer() {
  }

  //////// MARK: full screen ////////

  function fullScreen() {
    timerCell.classList.add('full');
    fullScreenButton.removeEventListener('click', fullScreen);
    fullScreenButton.addEventListener('click', exitFullScreen);
    fullScreenButton.innerHTML = '<svg viewBox="0 0 24 24"><!-- https://akveo.github.io/eva-icons/ --><path d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2z"/><path d="M10 13H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/></svg>';
    if (timerCell.requestFullscreen) {
      timerCell.requestFullscreen();
    } else if (timerCell.mozRequestFullScreen) {
      timerCell.mozRequestFullScreen();
    } else if (timerCell.webkitRequestFullScreen) {
      timerCell.webkitRequestFullScreen();
    }
  }

  function exitFullScreen() {
    timerCell.classList.remove('full');
    fullScreenButton.removeEventListener('click', exitFullScreen);
    fullScreenButton.addEventListener('click', fullScreen);
    fullScreenButton.innerHTML = '<svg viewBox="0 0 24 24"><!-- https://akveo.github.io/eva-icons/ --><path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42V10a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"/><path d="M10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42z"/></svg>';
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozExitFullScreen) {
      document.mozExitFullScreen();
    } else if (document.webkitExitFullScreen) {
      document.webkitExitFullScreen();
    }
  }

  //////// MARK: UI control ////////

  function focusPreviousInput(input) {
  }

  function focusNextInput(input) {
  }

  function handleInputClick(e) {
  }

  function handleInputKeydown(e) {
  }
}
*/
