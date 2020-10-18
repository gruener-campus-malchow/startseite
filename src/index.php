<?php

?><!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <meta name=viewport content="initial-scale=1">
    <title>Campus Informations System</title>
  </head>
  <body>
    <div class=cis-header>
      <div class=cis-brand>CIS home</div>
      <form class=cis-header-search action="https://ecosia.org/search" method=GET>
        <input class=cis-search-input type=text name=q placeholder="Umweltfreundlich Suchen" required autofocus autocomplete=off>
        <button class=cis-search-button type=submit><svg viewBox="-2 -2 20 20"><path d="M6,0A6,6 0 01 6,12 6,6 0 01 6,0zM10.25,10.25L16,16" fill="none" stroke="#ddd" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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
      <div class="grid-cell grid-cell-vertical" data-cell-action=vertretungsplan>Vertretungsplan</div>
      <a class="grid-cell grid-cell-horizontal" href="https://www.lernraum-berlin.de/v1und2/my/">Lernraum</a>
      <a class=grid-cell href="https://cis.gruener-campus-malchow.de/belegungsplan/">Belegungsplan</a>
      <div class="grid-cell grid-cell-vertical" data-cell-action=timer>Timer</div>
      <a class=grid-cell href="https://gcm.schule/printer/">Drucker/Kopierer</a>
      <div class="grid-cell grid-cell-vertical" data-cell-action=snake>Snake</div>
      <a class=grid-cell href="http://fbi.gruener-campus-malchow.de/cis/wetterstation/">Wetterstation</a>
      <a class="grid-cell grid-cell-vertical" href="http://gruener-campus-malchow.de">Webseite<div class="subtitle">Heute schon gelacht?™<br>Traurig, aber wahr:<br>Die offizielle Webpräsenz unserer Schule</div></a>
      <a class="grid-cell grid-cell-horizontal" href="https://gcm.schule/tv/">CampusTV</a>
      <a class=grid-cell href="https://gcm.schule/wififilter/">Wififilter</a>
    </div>

  </body>
</html>
