all: minify bookmark

minify:
	node_modules/uglify-js/bin/uglifyjs obfuscate.js -m -c > obfuscate.min.js

uglify:
	npm install uglify-js

# XXX: does not work
bookmark: minify
	printf "javascript:" > bookmark.js
	cat obfuscate.min.js >> bookmark.js


