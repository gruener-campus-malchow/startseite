<?php

$tiles = [
  'Vertretungsplan' => [
    'layout' => 'vertical'
  ],
  'Lernraum' => [
    'layout' => 'horizontal',
    'href' => 'https://www.lernraum-berlin.de/v1und2/my/',
    'icon' => 'layout'
  ],
  'Belegungsplan' => [
    'href' => 'https://cis.gruener-campus-malchow.de/belegungsplan/',
    'icon' => 'clipboard'
  ],
  'Timer' => [
    'layout' => 'vertical'
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
  'Webseite' => [
    'layout' => 'vertical',
    'href' => 'http://gruener-campus-malchow.de',
    'subtitle' => [
      'Heute schon gelacht?™',
      'Traurig, aber wahr:',
      'Die offizielle Webpräsenz unserer Schule'
    ],
    'icon' => 'link'
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
    <meta charset=utf-8>
    <meta name=viewport content="initial-scale=1">
    <title>Campus Informations System</title>
    <link rel="stylesheet" href="build/index.css">
  </head>
  <body>
    <div class=cis-header>
      <div class=cis-brand>CIS home</div>
      <form class=cis-header-search action="https://ecosia.org/search" method=GET>
        <input class=cis-search-input type=text name=q placeholder="Umweltfreundlich Suchen" required autofocus autocomplete=off>
        <button class=cis-search-button type=submit><?php icon('search'); ?></button>
      </form>
      <div class=spacer><!-- this is here to center the search bar. feel free to replace with something useful if you want to have something on the right --></div>
      <!--
      Probleme mit ecosia:
      1. Umweltverträglichkeit
          nicht alle Server werden mit Strom aus erneuerbaren Quellen betrieben
      2. Datenschutz
          einige Daten (IP-Adresse, User Agent String, Suchanfragen) werden an bing (Microsoft) weitergegeben
      -->
    </div>
    <div class=grid-container>
      <!--div class="grid-cell grid-cell-vertical" data-cell-action=vertretungsplan>Vertretungsplan</div>
      <a class="grid-cell grid-cell-horizontal" href="https://www.lernraum-berlin.de/v1und2/my/">Lernraum</a>
      <a class=grid-cell href="https://cis.gruener-campus-malchow.de/belegungsplan/">Belegungsplan</a>
      <div class="grid-cell grid-cell-vertical" data-cell-action=timer>Timer</div>
      <a class=grid-cell href="https://gcm.schule/printer/">Drucker/Kopierer</a>
      <div class="grid-cell grid-cell-vertical" data-cell-action=snake>Snake</div>
      <a class=grid-cell href="http://fbi.gruener-campus-malchow.de/cis/wetterstation/">Wetterstation</a>
      <a class="grid-cell grid-cell-vertical" href="http://gruener-campus-malchow.de">Webseite<div class="subtitle">Heute schon gelacht?™<br>Traurig, aber wahr:<br>Die offizielle Webpräsenz unserer Schule</div></a>
      <a class="grid-cell grid-cell-horizontal" href="https://gcm.schule/tv/">CampusTV</a>
      <a class=grid-cell href="https://gcm.schule/wififilter/">Wififilter</a-->

      <?php
      foreach ($tiles as $name => $data) {
        // start tag
        echo isset($data['href']) ? '<a href="' . $data['href'] . '"' : '<div';
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
