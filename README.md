# startseite
This is a project at the **gruener-campus-malchow** attempting to replace the old, ugly home page we currently have with something new (and better).

[see this project in action](https://start.gcm.schule/)

This project is using [feather icons](https://github.com/feathericons/feather/)

## Installation

This repository contains all the necessary files for deploying this somewhere.
To successfully host it, you'll need the `index.html` (`src/index.php` is also fine, but just produces the same static site already in the html file), `index.css` and `index.js` files in the same directory.

If you want to change some tiles, that's possible using `$tiles` at the start of `src/index.php`, it should be pretty self-explanatory.

## Building

You can build the project with `npm`:

```bash
npm ci # install dependencies
grunt watch # for development
grunt build # for production
```

You can build the HTML DOM with `php`:

```php
php src/index.php > index.html
```
