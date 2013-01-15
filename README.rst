.. contents:: :local:

Introduction
-------------

Obfuscate.js is a Javascript console tool which obfuscates the text on the web page
hiding sensitive information. The purpose is to be able to easily make
shareable screenshots for collaborative debugging, examples, demos and so on,
so that you do not need to manually blur parts of the screen shot in Photoshop, GIMP,
etc. image manipulation program.

* You invoke Obfuscate.js script from the Javascript console of your web browser

* Obfuscate.js obfuscates the whole page or parts of it

* Take a screenshot

* Post to a public forum, blog or other media

Usage
-----

Obfuscate.js can walk through the whole page (``<body>``) or arbitary bit chosen by CSS selectors.

Copy-paste line of text from `obfuscate.min.js <https://github.com/miohtama/obfuscate.js/blob/master/obfuscate.min.js>`_ to your Javascript console.

After this you can obfuscate a part of a page by writing the command in the console::

    obfuscate("#waffle-grid-container"); // Obfuscate contents of Google Spreadsheet

Or simply obfuscate all text the whole page::

    obfuscate(); // Obfuscate all the text on the page

Other
------

* There is some heurestics to keep the text similar looking to the orignal text i.e.
  retaining all whitespaces and punctuation in place

* Vanilla Javascript

* Tested with Firefox, Chrome


Future enhanchement potential
-------------------------------

* Make a logic which keeps text length intact (replaces characters with characters of same width)

Author
------

`Mikko Ohtamaa <http://opensourcehacker.com>`_ (`Twitter <http://twitter.com/moo9000>`_)

