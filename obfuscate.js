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
    function obfuscate(target, stylesArray)
	{

        if(!target)
		{
            target = "body";
        }
		
		// If the user has specified one or more styles to apply
		if(typeof(stylesArray)=="object")
		{
			// obtain the correct venbdor prefix for the browser we're executing in
			var prefix=getVendorPrefix();
			
			// if we have a prefix for this browser
			if(prefix)
			{
				// create a test HTML element to verify with (this element will never be added to the DOM)
				var testElement=document.createElement("div"), res=false;
				
				// loop through the supplied user style(s)
				for(var i=0; i<stylesArray.length; i++)
				{
					// try applying a non-prefixed style first of all
					testElement.style[stylesArray[i][0]]=stylesArray[i][1];
					
					// test whether the non-prefixed style applied successfully (it'll return the style) or not (it'll return nothing)
					res=testElement.style[stylesArray[i][0]];

					// if no prefix has been applied but we need one...
					if(stylesArray[i][0].indexOf(prefix)!=0 && !res)
					{
						// ...add the prefix to the user supplied style
						stylesArray[i][0]=prefix+ucfirst(stylesArray[i][0]);
					}

				}
			}
		}
		else
		{
			stylesArray=false;
		}

        var elems = document.querySelectorAll(target);
        for(var i=0; i<elems.length; i++)
		{
			if(stylesArray)
			{
				for(var j=0; j<stylesArray.length; j++)
				{					
					elems[i].style[stylesArray[j][0]]=stylesArray[j][1];
				}
			}
			else
			{
				walk(elems[i]);
			}
        }
    }
	
	
	
	/*
	 * getVendorPrefix() is taken and only very slightly adapted from http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/ by Lea Verou
	 * 
	 */
	function getVendorPrefix()
	{
		var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

		var someScript = document.getElementsByTagName('script')[0];

		for(var prop in someScript.style)
		{
			if(regex.test(prop))
			{
				// test is faster than match, so it's better to perform
				// that on the lot and match only when necessary
				return prop.match(regex)[0].toLowerCase();
			}

		}

		// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
		// However (prop in style) returns the correct value, so we'll have to test for
		// the precence of a specific property
		if('WebkitOpacity' in someScript.style) 
			return 'webkit';
		
		if('KhtmlOpacity' in someScript.style)
			return 'khtml';

		return '';
	}
	
	/*
	 * ucfirst taken directly from http://phpjs.org/functions/ucfirst/ credits below
	 */
	function ucfirst(str)
	{
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// *     example 1: ucfirst('kevin van zonneveld');
		// *     returns 1: 'Kevin van zonneveld'
		str += '';
		var f = str.charAt(0).toUpperCase();
		return f + str.substr(1);
	}
	
	
    // export
    if(window) {
        window.obfuscate = obfuscate;
    } else {
        // Execute as bookmarklet
        obfuscate();
    }

})();