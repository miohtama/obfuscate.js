/**
 * Obfuscate.js
 *
 * Copyright 2013 Mikko Ohtamaa, http://opensourcehacker.com
 *
 * License: MIT
 */

(function() {

    "use strict";

    var charpool = "abcdefghijklmnopqrstuvwxyz";

    var digitpool = "1234567890";

    var symbolpool = "-.,;:_ |<>*+(){}";

    // http://stackoverflow.com/a/3843677/315168
    function isDigit(val) {
      return String(+val).charAt(0) == val;
    }

    function isUpperCase(myString) {
      return (myString == myString.toUpperCase());
    }

    function isLowerCase(myString) {
      return (myString == myString.toLowerCase());
    }

    // Match some common symbols we do not want to alter
    function isSymbol(char) {
        return symbolpool.indexOf(char) >= 0;
    }

    function isWhitespace(char) {
        var pat1 = /\s/;
        return pat1.test(char);
    }


    function getRandomArrayEntry(pool) {
        return pool[Math.floor(Math.random()*pool.length)];
    }

    /**
     * Replace the old character with and obfuscated characetr.
     *
     * Have some heurestics to make sure the new text resembles
     * the old text somehow, but still breaking the content.
     */
    function randomChar(old) {

        if(isDigit(old)) {
            return getRandomArrayEntry(digitpool);
        }

        // Pass through for . , etc.
        if(isSymbol(old) || isWhitespace(old)) {
            return old;
        }

        // Replace as a letter (incl. unicode)
        var r = getRandomArrayEntry(charpool);

        if(isUpperCase(old)) {
            return r.toUpperCase();
        } else {
            return r;
        }
    }

    function getReplacingWord(word) {
        var len = word.length;
        var newChars = [];
        for(var i=0; i<len; i++) {
            newChars[i] = randomChar(word[i]);
        }
        return newChars.join("");
    }

    function obfuscateText(node, text) {
        var words = text.split(" ");

        for(var i=0; i<words.length; i++) {
            words[i] = getReplacingWord(words[i]);
        }

        return words.join(" ");
    }

    /**
     * Walk the DOM tree text nodes
     *
     * http://stackoverflow.com/a/5817243/315168
     *
     * @param  node
     */
    function walk(node) {
        var child, next;
        switch (node.nodeType) {
            case 3: // Text node
                var newText = obfuscateText(node, node.nodeValue);
                node.nodeValue = newText;
                break;
            case 1: // Element node
            case 9: // Document node
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;
        }
    }

    /**
     * Obfuscates a target selection.
     *
     * If no target is given, obfuscate all the text on the page.
     */
    function obfuscate(target) {

        if(!target) {
            target = "body";
        }

        var elems = document.querySelectorAll(target);
        for(var i=0; i<elems.length; i++) {
            walk(elems[i]);
        }
    }


    // export
    if(window) {
        window.obfuscate = obfuscate;
    } else {
        // Execute as bookmarklet
        obfuscate();
    }

})();