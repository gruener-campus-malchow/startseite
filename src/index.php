<?php

$tiles = [
  'Vertretungsplan' => [
    'layout' => 'vertical'
  ],
  'Lernraum' => [
    'layout' => 'horizontal',
    'href' => 'https://www.lernraum-berlin.de/v1/my/',
    'icon' => 'layout'
  ],
  'Belegungsplan' => [
    'href' => 'https://gcm.schule/belegungsplan/',
    'icon' => 'clipboard'
  ],
  'Timer' => [
    'layout' => 'vertical',
    'href' => 'https://gcm.schule/timer.html'
  ],
  'Drucker/Kopierer' => [
    'href' => 'https://gcm.schule/printer/',
    'icon' => 'printer'
  ],
  'Snake' => [
    'layout' => 'vertical'
  ],
  'Wetterstation' => [
    'href' => 'http://fbi.gruener-campus-malchow.de/cis/wetterstation/',
    'icon' => 'sun'
  ],
  /*'Webseite' => [
    'layout' => 'vertical',
    'href' => 'http://gruener-campus-malchow.de',
    'subtitle' => [
      'Heute schon gelacht?™',
      'Traurig, aber wahr:',
      'Die offizielle Webpräsenz unserer Schule'
    ],
    'icon' => 'link'
  ],*/
  'GCM Slides' => [
    'layout' => 'vertical',
    'href' => 'https://gcm.schule/slides/',
    'icon' => 'layers',
    'subtitle' => 'Präsentationen in 30 Sekunden™'
  ],
  'CampusTV' => [
    'layout' => 'horizontal',
    'href' => 'https://gcm.schule/tv/',
    'icon' => 'tv'
  ],
  'Wififilter' => [
    'href' => 'https://gcm.schule/wififilter/',
    'icon' => 'wifi'
  ]
];

function icon ($name) {
  $src = 'src/icons/' . $name . '.svg';
  if (file_exists($src)) {
    include $src;
  }
}

?><!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1">
    <title>Campus Informations System</title>
    <link rel="stylesheet" href="index.css">
    <script src="index.js"></script>
  </head>
  <body>
    <div class="cis-header">
      <div class="cis-brand">CIS home</div>
      <form class="cis-header-search" action="https://ecosia.org/search" method=GET>
        <input class="cis-search-input" type="text" name="q" placeholder="Umweltfreundlich Suchen" required autofocus autocomplete="off">
        <button class="cis-search-button" type="submit">
        	<div class="cis-search-button-background"><?php icon('search'); ?></div>
    	</button>
      </form>
      <a class="secret" href="https://gcm.schule/admin/?geheim" target="_blank">Geheimer Admin-Bereich</a>
    </div>
    <div class="grid-container">
      <?php
      foreach ($tiles as $name => $data) {
        // start tag
        echo isset($data['href']) ? '<a href="' . $data['href'] . '"' : '<div';
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
