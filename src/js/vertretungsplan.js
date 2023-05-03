const vp = {
  init: function () {
    vp.cell = document.querySelector('.grid-cell[data-label="Vertretungsplan"]');
    vp.cell.classList.add('vertretungsplan');
    vp.cell.classList.add('static');
    vp.cell.innerHTML += '<div class="spinner"></div>';

    //const json_url = 'http://@@@@@@@@@@.@@@@@.@@@@@@@.net/example_data.json';
    //const json_url = 'https://@@@.@@@@@@@-@@@@@@-@@@@@@@.de/@@@/@@@@@@@@@@@@.php?cert=@@@@@@@@@@@@@';
    const json_url = 'https://gcm.schule/cis/api/plan/sus'; // nobody is going to find this secret api

    fetch(json_url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        vp.error(vp.errors.failed);
      }
    })
    .then(json => {
      vp.cell.innerHTML = '';
      vp.populate(json);
    })
    .catch(error => {
      console.error(error);
      vp.error(vp.errors.failed);
    });
  },


  populate: function (json) {
    // if no vertretungsplan is available
    if (!json) return vp.error(vp.errors.empty);

    // create container for general information
    const general_container = create_element('div', {class: 'vp-general'}, [
      create_element('div', {class: 'vp-header'}, (new Date(json.date)).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })),
    ]);

    // add info as paragraphs
    json.info.forEach(info => general_container.append(create_element('div', {class: 'vp-content'}, info)));

    // create inner container
    const container = create_element('div', {class: 'vp-container'}, [general_container]);
    vp.cell.append(container);

    json.list.forEach(entry => {
      const body = create_element('div', {class: 'vp-body'});
      container.append(create_element('div', {class: 'vp-header'}, [
        create_element('div', {class: 'class-label'}, entry.name),
      ]), body);

      entry.contents.forEach(row => {
        const type = row.type || '';
        const note = row.note || '';
        const resolve_replacement = attr => typeof attr == 'object' ? `<s>${attr.old}</s> <strong>${attr.new}</strong>` : (attr || '');

        body.append(create_element('div', {class: 'vp-content'}, [
          create_element('div', {class: 'vp-content1'}, (!row.time ? '' : `<strong>${row.time || ''}.</strong> `) + resolve_replacement(row.subject)),
          create_element('div', {class: 'vp-content2'}, resolve_replacement(row.room)),
          create_element('div', {class: 'vp-content3'}, row.type == 'Vertretung' ? resolve_replacement(row.teacher) : ''),
          create_element('div', {class: 'vp-content3'}, type + (!type || !note ? '' : ': ') + note),
        ]));
      });
    });
      
    vp.cell.innerHTML += `<a class="button" href="https://dsbmobile.de" target="_blank" rel="noreferrer">DSB&nbsp;${vp.external_link_icon}</a>`;

    // simple helper function, see https://gist.github.com/eintyp/f9106f6b6b93189c8991f89cb1335554
    function create_element(tag, attributes = {}, content = []) {
      const elem = document.createElement(tag);
      for (attr in attributes) elem.setAttribute(attr, attributes[attr]);
      if (typeof content === 'string') elem.innerHTML = content;
      else content.forEach(child => elem.append(child));
      return elem;
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
    
    let errorLabel = document.createElement('DIV');
    errorLabel.innerHTML = e;
    errorLabel.classList.add('subtitle', 'error-message');
    vp.cell.appendChild(errorLabel);
    
    let dsbButton = document.createElement('A');
    dsbButton.innerHTML = `DSB&nbsp;${vp.external_link_icon}`;
    dsbButton.setAttribute('href', 'https://dsbmobile.de');
    dsbButton.setAttribute('class', 'button primary');
    dsbButton.setAttribute('rel', 'noreferrer');
    vp.cell.appendChild(dsbButton);
  },
  // error types (this is like a bad version of a struct)
  errors: {
    failed: 'network unreachable or request failed',
    empty: 'no data available'
  },
  
  external_link_icon: '<svg width="16" height="16" viewBox="0 1 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
};

document.addEventListener('DOMContentLoaded', vp.init);
