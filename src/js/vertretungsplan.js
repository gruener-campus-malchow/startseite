let vp = {
  init: function () {
    vp.cell = document.querySelector('.grid-cell[data-label="Vertretungsplan"]');
    vp.cell.classList.add('vertretungsplan');
    vp.cell.classList.add('static');
    vp.cell.innerHTML = '';

    vp.elements = [];

    //const json_url = 'http://@@@@@@@@@@.@@@@@.@@@@@@@.net/example_data.json';
    //const json_url = 'https://@@@.@@@@@@@-@@@@@@-@@@@@@@.de/@@@/@@@@@@@@@@@@.php?cert=@@@@@@@@@@@@@';
    const json_url = 'https://gcm.schule/cis/api/plan/today'; // nobody is going to find this secret api

    fetch(json_url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        vp.error(vp.errors.failed);
      }
    })
    .then((json) => {
      vp.populate(json);
    })
    .catch((error) => {
      vp.error(vp.errors.failed);
    });
  },


  populate: function (json) {
    // this is some additional info we don't need, but is included in the api anyway
    const special_keys = ['Tag', 'Time', 'Informationen'];
    // the data for the current day is the first entry in the json
    // we don't show vertretungsplan for other days
    let day = json[0];
    // if day is 'false', no vertretungsplan is available
    if (day == 'false') return vp.error(vp.errors.empty);
    // create inner container
    vp.elements.container = createDiv('vp-container');
    vp.cell.appendChild(vp.elements.container);

    for (entryKey in day) {
      let entry = day[entryKey]
      // this means that the entry is a class
      if (!special_keys.includes(entryKey)) {
        let year = parseInt(entryKey); // hacky solution, but it works™
        // append class name and content container to cell
        let classContainer = createDiv('vp-header');
        let classLabel = createDiv('class-label', entryKey);
        let contentContainer = createDiv('vp-body');

        classContainer.appendChild(classLabel);
        vp.elements.container.appendChild(classContainer);
        vp.elements.container.appendChild(contentContainer);

        // add content to container
        for (contentKey in entry) {
          let content = entry[contentKey];
          // get required info from content
          let hour = content['Stunde'] || '';
          let subject = content['Fach'] || '';
          let location = content['Raum'] != '---' ? content['Raum'] : '';
          let note = (content['Hinweis'] || '').trim();
          let type = (content['Art'] || '').trim();

          // write that down, write that down
          let contentElement = createDiv('vp-content');
          let generalContainer = createDiv('vp-content1', hour + (hour == '' ? '' : '. ') + subject);
          let roomContainer = createDiv('vp-content2', location);
          let typeContainer = createDiv('vp-content3', type + (type == '' || note == '' ? '' : ': ') + note);

          contentElement.appendChild(generalContainer);
          contentElement.appendChild(roomContainer);
          contentElement.appendChild(typeContainer);
          contentContainer.appendChild(contentElement);
        }
      }
    }

    // simple helper function, pretty self-explanatory
    function createDiv(classList, content) {
      let element = document.createElement('DIV');
      element.setAttribute('class', classList);
      element.innerHTML = content || '';
      return element;
    }
  },


  // error handling
  error: function (e) {
    // test if error is a known error or if someone screwed something up
    if (Object.values(vp.errors).indexOf(e) > -1) {
      console.error(e);
    } else {
      console.error('unknown error');
    }

    // show error message
    vp.cell.innerHTML = '';
    vp.cell.appendChild(document.createTextNode('Kein Vertretungsplan verfügbar'));
    let dsbButton = document.createElement('A');
    dsbButton.innerHTML = 'DSB';
    dsbButton.setAttribute('href', 'https://dsbmobile.de');
    dsbButton.setAttribute('class', 'button primary');
    vp.cell.appendChild(dsbButton);
    let errorLabel = document.createElement('DIV');
    errorLabel.innerHTML = e;
    errorLabel.classList.add('subtitle');
    vp.cell.appendChild(errorLabel);
  },
  // error types (this is like a bad version of a struct)
  errors: {
    failed: 'network unreachable or request failed',
    empty: 'no data available'
  }
};

document.addEventListener('DOMContentLoaded', vp.init);
