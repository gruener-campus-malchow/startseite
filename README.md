# startseite
*startseite* is a basic home page for the **gruener-campus-malchow**.
The old home page featured a bold orange (yes, *orange*) font with heavy shadows, carefully arranged with blurry images.
This appeared to the author as optimizable.

[**`check out the ✨glamorous✨ design here`**](https://start.gcm.schule/)

This project is using [feather icons](https://github.com/feathericons/feather/).

## Installation

This repository contains all the necessary files for deploying.
You'll need the `index.php`, `index.css` and `index.js` files hosted in the same directory.
If your server doesn't support php (e.g. via file://), compile the DOM with `php index.php > index.html` and use the html file instead.

If you want to change some tiles, that's possible using `$tiles` at the start of `index.php`, it should be pretty self-explanatory.

## Building

Building scss & js with `npm`:

```bash
npm ci # install dependencies
grunt watch # for development
grunt build # for production
```
