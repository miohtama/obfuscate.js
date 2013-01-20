.. contents:: :local:

Introduction
-------------

Obfuscate.js is a Javascript console tool which obfuscates the text on the web page
hiding sensitive information. The purpose of this tool is to be able to easily make
shareable screenshots for collaborative debugging, examples, demos and so on.
You no longer need to manually blur parts of the screen shot in Photoshop, GIMP,
etc. image manipulation program, saving your precious time and making sharing
screenshots easier.

* You invoke Obfuscate.js script from the Javascript console of your web browser

* Obfuscate.js obfuscates the whole web page or parts of it, replacing all text on the page
  with gibberish

* Take a screenshot

* Post the screenshot to a public forum, blog or other media where you could not share the information
  and show the symptoms otherwise

Usage
---------------

Obfuscate.js can walk through the whole page (``<body>``) or arbitary bit chosen by CSS selectors.

Open the page with sensitive information in your web browser.

Open Javascript console. Copy-paste line of text from `obfuscate.min.js <https://github.com/miohtama/obfuscate.js/blob/master/obfuscate.min.js>`_ to your Javascript console.

.. image :: https://github.com/miohtama/obfuscate.js/raw/master/media/console.png
    :width: 500

In this point you have the orignal page still with sensitive information

.. image :: https://github.com/miohtama/obfuscate.js/raw/master/media/sensitive.png
    :width: 500px


After this you can obfuscate a part of a page by writing the command in the console::

    obfuscate("#waffle-grid-container"); // Obfuscate contents of Google Spreadsheet

.. image :: https://github.com/miohtama/obfuscate.js/raw/master/media/part.png
    :width: 500px

To obfuscate the content of Google Apps document::

    obfuscate(".kix-paginateddocumentplugin")

Or simply obfuscate all text the whole web page::

    obfuscate(); // Obfuscate all the text on the page

.. image :: https://raw.github.com/miohtama/obfuscate.js/master/media/full.png
    :width: 500px

Other
------

* There is some heurestics to keep the text similar looking to the orignal text i.e.
  retaining all whitespaces and punctuation in place

* It's vanilla Javascript

* Tested with Firefox, Chrome

Future enhanchements
-------------------------------

* Make a logic which keeps text length intact (replaces words with the words of same width)

* Create a bookmarklet out of it. Curretly one cannot execute bookmarklet code (bookmark.js)
  because some sort of access error with Javascript ``window`` object

Author
------

`Mikko Ohtamaa <http://opensourcehacker.com>`_ (`Twitter <http://twitter.com/moo9000>`_, `Facebook <https://www.facebook.com/pages/Open-Source-Hacker/181710458567630>`_)

