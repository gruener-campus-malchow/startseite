# startseite
*startseite* is a basic home page for the **gruener-campus-malchow**.
The old home page featured a bold orange (yes, *orange*) font with heavy shadows, carefully arranged with pixelated images.
This appeared to the author as optimizable.

[**`check out the ✨glamorous✨ design here`**](https://start.gcm.schule/)

This project is using [feather icons](https://github.com/feathericons/feather/).

## Installation

This repository contains all the necessary files for deployment.
To successfully host it, you'll need the `index.html` (`src/index.php` is also fine, it just produces the same static html), `index.css` and `index.js` files in the same directory.

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
