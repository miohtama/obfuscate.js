all: minify

minify:
	node_modules/uglify-js/bin/uglifyjs obfuscate.js -m > obfuscate.min.js

uglify:
	npm install uglify-js