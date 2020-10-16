# startseite
next generation start site

All CSS will be written in SCSS, so if you don't have a compiler you should probably install one from [sass-lang.com](https://sass-lang.com/install)
You can compile for production using the following command:

    sass --style=compressed --no-source-map src/index.scss build/index.css

For now, this project is using a simple php script to compile the DOM structure. Execute it via

    php src/index.php > index.html
