<?php

$tiles = [
  'Vertretungsplan' => [
    'href' => 'https://gcm.schule/vertretungsplan/',
    'layout' => 'vertical',
  ],
  'Lernraum' => [
    'href' => 'https://www.lernraum-berlin.de/v1/my/',
    'icon' => 'layout',
    'layout' => 'horizontal',
  ],
  'Belegungsplan' => [
    'href' => 'https://gcm.schule/belegungsplan/',
    'icon' => 'clipboard',
  ],
  'Timer' => [
    'layout' => 'vertical',
    'href' => 'https://gcm.schule/timer.html',
  ],
  'Offizielle Webseite' => [
    'href' => 'https://gruener-campus-malchow.de/',
    'icon' => 'link',
    'subtitle' => 'Weiterführende Informationen',
  ],
  'Snake' => [
    'layout' => 'vertical',
  ],
  'TDOT \'22' => [
    'href' => 'https://gcm.schule/tdot/',
    'subtitle' => 'Tag der offenen Tür 2022',
  ],
  'GCM Slides' => [
    'layout' => 'vertical',
    'href' => 'https://docs.gcm.schule/slides/',
    'icon' => 'layers',
    'subtitle' => 'Präsentationen in 30 Sekunden™',
  ],
  'PHP Cheat Sheet' => [
    'href' => 'https://gcm.schule/php',
    'subtitle' => 'Nützliche PHP-Hacks, (nicht nur) für Herrn B.',
  ],
  'Datenschutz' => [
    'href' => 'https://gcm.schule/datenschutz',
    'icon' => 'file-text',
  ],
  'Wikipedia GCM' => [
    'href' => 'https://de.wikipedia.org/wiki/Grüner_Campus_Malchow',
    'icon' => 'globe',
    'subtitle' => 'Eintrag zu unserer Schule',
  ]
];

function icon ($name) {
  $src = 'src/icons/' . $name . '.svg';
  if (file_exists($src)) {
    include $src;
  }
}

?><!doctype html>
<html lang="de" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>Grüner Campus Malchow</title>
    <link rel="stylesheet" href="index.css">
    <script src="index.js"></script>
  </head>
  <body>
    <div class="cis-header">
      <div class="cis-section align-left">
        <a class="cis-brand" href="/"><?php icon('logo-gcm'); ?><div class="cis-brand-title">Startseite</div></a>
      </div>
      <form class="cis-header-search cis-section" action="https://ecosia.org/search" method=GET>
        <input class="cis-search-input" type="text" name="q" placeholder="Umweltfreundlich Suchen" required autofocus autocomplete="off">
        <button class="cis-search-button" type="submit">
          <span class="cis-search-button-background"><?php icon('search'); ?></span>
        </button>
      </form>
      <div class="cis-section align-right">
        <a class="secret" href="https://gcm.schule/admin/?geheim" target="_blank">Geheimer Admin-Bereich</a>
      </div>
    </div>
    <div class="grid-container">
      <?php
      foreach ($tiles as $name => $data) {
        // start tag
        echo isset($data['href']) ? '<a href="' . $data['href'] . '" rel="noreferrer"' : '<div';
        echo ' data-label="' . preg_replace('/\W/', '-', $name) . '"';
        echo isset($data['layout']) ? ' class="grid-cell grid-cell-' . $data['layout'] . '">' : ' class="grid-cell">';

        // icon
        if (isset($data['icon'])) {
          icon($data['icon']);
        }

        // title
        echo $name;
        // subtitle
        echo isset($data['subtitle']) ? '<div class="subtitle">' .
          (is_array($data['subtitle']) ? implode('<br>', $data['subtitle']) : $data['subtitle'])
          . '</div>' : '';

        // end tag
        echo isset($data['href']) ? '</a>' : '</div>';
      }
      ?>
    </div>

  </body>
</html>
