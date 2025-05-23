<?php

date_default_timezone_set('Europe/Berlin');
$promotions = [
	[
		'start-date' => strtotime('2023-12-01'),
		'end-date' => strtotime('2024-01-12 18:00'),
		'headline' => '12hackn8@gcm',
		'body' => 'vom <strong>12. Januar 2024</strong> bis <strong>13. Januar 2024</strong>',
		'button-text' => 'Infos & Anmeldung',
		'button-url' => 'https://hackn8.de',
	],
	[
		'start-date' => strtotime('2025-06-16'),
		'end-date' => strtotime('2025-06-28 14:00'),
		'headline' => '15hackn8@gcm',
		'body' => 'vom <strong>27. Juni 2025</strong> bis <strong>28. Juni 2025</strong>',
		'button-text' => 'Infos & Anmeldung',
		'button-url' => 'https://hackn8.de',
	],
];

$tiles = [
	'Vertretungsplan' => [
		'href' => 'https://gcm.schule/vertretungsplan/',
		'layout' => 'vertical',
	],
	'Lernraum' => [
		'href' => 'https://11k10.lernraum-berlin.de/',
		'icon' => 'layout',
		'layout' => 'horizontal',
	],
	'Github' => [
		'href' => 'https://github.com/gruener-campus-malchow',
		'icon' => 'github',
		'subtitle' => 'Code und Projekte, die wir manchmal wirklich benutzen',
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
	'Pixelmap' => [
		'layout' => 'vertical',
		'href' => 'https://gcm.schule/pixelmap',
	],
	'Material' => [
		'href' => 'https://gcm.schule/material/',
		'icon' => 'book',
		'subtitle' => 'Unterrichtsmaterial einiger Kurse',
	],
	'GCM Slides' => [
		'layout' => 'vertical',
		'href' => 'https://docs.gcm.schule/slides/',
		'icon' => 'layers',
		'subtitle' => 'Präsentationen in 30 Sekunden™',
	],
	'PHP Cheat Sheet' => [
		'href' => 'https://gcm.schule/php',
		'subtitle' => 'Nützliche PHP-Hacks',
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
	$src = 'icons/' . $name . '.svg';
	if (file_exists($src)) {
		include $src;
	}
}

?><!doctype html>
<html lang="de" dir="ltr">
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1">
<title>Grüner Campus Malchow</title>
<link rel="stylesheet" href="index.css?<?=filemtime('index.css')?>">
<script src="index.js?<?=filemtime('index.js')?>"></script>

<header class="cis-header">
	<div class="cis-section align-left">
		<a class="cis-brand" href="/"><?php icon('logo-gcm'); ?><div class="cis-brand-title">Startseite</div></a>
	</div>
	<form class="cis-header-search cis-section" action="https://ecosia.org/search" method=GET>
		<input class="cis-search-input" type="text" name="q" placeholder="Suchen oder KI fragen" required autofocus autocomplete="off">
		<button id="chat-search" class="cis-search-button" type="button" title="KI fragen">
			<span class="cis-search-button-background"><?php icon('cpu'); ?></span>
		</button>
		<button class="cis-search-button" type="submit" title="suchen">
			<span class="cis-search-button-background"><?php icon('search'); ?></span>
		</button>
	</form>
	<div class="cis-section align-right">
		<!--a class="secret" href="https://gcm.schule/admin/?geheim" target="_blank">Geheimer Admin-Bereich</a-->
	</div>
</header>

<?php
	foreach ($promotions as $promotion) {
		if (array_key_exists('start-date', $promotion) && time() < $promotion['start-date']) continue;
		if (array_key_exists('end-date', $promotion) && time() > $promotion['end-date']) continue;
		
		echo "<section class=\"promotion-banner\">\n";
		if (array_key_exists('headline', $promotion)) echo "\t<h2>{$promotion['headline']}</h2>\n";
		if (array_key_exists('body', $promotion)) echo "\t<p>{$promotion['body']}</p>\n";
		if (array_key_exists('button-text', $promotion) && array_key_exists('button-url', $promotion)) echo "\t<a class=\"call-to-action\" href=\"{$promotion['button-url']}\" target=\"_blank\" rel=\"noreferrer\">{$promotion['button-text']}</a>\n";
		echo "</section>\n";
	}
?>

<section class="grid-container">
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
</section>
