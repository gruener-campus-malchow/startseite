# startseite
This is a project at the **gruener-campus-malchow** attempting to replace the old, ugly home page we currently have with something new (and better).

[see this project in action on GitHub Pages](https://gruener-campus-malchow.github.io/startseite/)

This project is using [feather icons](https://github.com/feathericons/feather/)

## Installation

This repository contains all the necessary files for deploying this somewhere.
To successfully host it, you'll need the `index.html` file (`src/index.php` is also fine, but just produces the same static site already in the html file), the `build/index.css` for styling and all JavaScript files from `src/` (or exclude some in case you want to get rid of some functionality).

In order to connect the site to DSB, you'll need to enter a valid api url in `src/vertretungsplan.js`.

If you want to change some tiles, that's possible using `$tiles` at the start of `src/index.php`, it should be pretty self-explanatory.

## Software

All CSS will be written in SCSS, so if you don't have a compiler you should probably install one from [sass-lang.com](https://sass-lang.com/install)
You can compile for production using the following command:

    sass --style=compressed --no-source-map src/index.scss build/index.css

For now, this project is using a simple php script to compile the DOM structure (because i'm lazy and can't be bothered setting up something better). Execute it via

    php src/index.php > index.html
