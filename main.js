$(function() {
	var conversions = {
		'uppercase': function(s) {
			return s.toUpperCase();
		},
		'lowercase': function(s) {
			return s.toLowerCase();
		},
		'URL encode': encodeURIComponent,
		'URL decode': decodeURIComponent,
		'ASCII to binary': ABC.toBinary,
		'binary to ASCII': ABC.toAscii,
		'escape HTML': function(s) {
			return s.replace(/[&<>"'\/]/g, function(c) {
				return {
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': '&quot;',
					"'": '&#39;',
					"/": '&#x2F;',
				}[c];
			});
		},
		'ROT-13': function(s) {
			// from http://stackoverflow.com/a/28490254/179805 by Stephen Quan
			return s.replace(/[A-Za-z]/g, function (c) {
				return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
					.charAt("NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c));
			});
		},
		'reverse': function(s) {
			return s.split("").reverse().join("");
		},
		'NATO phonetic alphabet': function(s) {
			var table = {
				'a': 'alpha',
				'b': 'bravo',
				'c': 'charlie',
				'd': 'delta',
				'e': 'echo',
				'f': 'foxtrot',
				'g': 'golf',
				'h': 'hotel',
				'i': 'india',
				'j': 'juliet',
				'k': 'kilo',
				'l': 'lima',
				'm': 'mike',
				'n': 'november',
				'o': 'oscar',
				'p': 'papa',
				'q': 'quebec',
				'r': 'romeo',
				's': 'sierra',
				't': 'tango',
				'u': 'uniform',
				'v': 'victor',
				'w': 'whiskey',
				'x': 'x-ray',
				'y': 'yankee',
				'z': 'zulu',
			};
			return s.split('').join(' ').replace(/[a-zA-Z]/g, function(c) {
				if (c in table) {
					return table[c];
				}
				else {
					return table[c.toLowerCase()].toUpperCase();
				}
			});
		},
		'a e s t h e t i c': function(s) {
			return s.split('').join(' ').replace(/ /g, '\u00A0');
		},
		'a  e  s  t  h  e  t  i  c': function(s) {
			return s.split('').join(' ').replace(/ /g, '\u00A0\u00A0');
		},
	};
	
	$.each(conversions, function(k, v) {
		$('#conversion').append(
			// convert multiple spaces to &nbsp; chars so they show up properly in the <select> box
			$(new Option(k.replace(/  /g, '\u00A0\u00A0'), k))
		);
	});

	if (!Url.queryString('c')) {
		 Url.updateSearchParam('c', 'reverse');
	}
	$('#conversion').val(Url.queryString('c').replace(/_/g, ' '));
	$('#conversion').change(function() {
		Url.updateSearchParam('c', $(this).val().replace(/ /g, '_'));
		convert();
	});
	
	function convert() {
		var conversion = conversions[$('#conversion').val()];
		var input = $('#input').val();
		try {
			var output = conversion(input);
		}
		catch(e) {
			$('#input').addClass('error');
			console.log(e);
			return;
		}
		$('#input').removeClass('error');
		$('#output').val(output);
	}
	
	$('#input').on('input', function() {
		convert();
	});

	$('#output').on('click', function() {
		this.setSelectionRange(0, this.value.length);
	});
});


// ABC - a generic, native JS (A)scii(B)inary(C)onverter.
// (c) 2013 Stephan Schmitz <eyecatchup@gmail.com>
// License: MIT, http://eyecatchup.mit-license.org
// URL: https://gist.github.com/eyecatchup/6742657
var ABC = {
	toAscii: function(bin) {
		return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
			return String.fromCharCode(parseInt(bin, 2));
		});
	},
	toBinary: function(str, spaceSeparatedOctets) {
		return str.replace(/[\s\S]/g, function(str) {
			str = ABC.zeroPad(str.charCodeAt().toString(2));
			return !1 == spaceSeparatedOctets ? str : str + " ";
		});
	},
	zeroPad: function(num) {
		return "00000000".slice(String(num).length) + num;
	},
};
