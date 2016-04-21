$(function() {
	var conversions = {
		'uppercase': function(s) {
			return s.toUpperCase();
		},
		'lowercase': function(s) {
			return s.toLowerCase();
		},
		'URL encode': function(s) {
			return encodeURIComponent(s);
		},
		'URL decode': function(s) {
			return decodeURIComponent(s);
		},
		'ASCII to binary': ABC.toBinary,
		'binary to ASCII': ABC.toAscii,
		'ROT-13': function(s) {
			// from http://stackoverflow.com/a/28490254/179805 by Stephen Quan
			return s.replace(/[A-Za-z]/g, function (c) {
				return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
					.charAt("NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c));
			});
		},
	};
	
	$.each(conversions, function(k, v) {
		$('#conversion').append($(new Option(k, k)));
	});
	
	$('#conversion').change(function() {
		window.location.hash = '#!' + $(this).val();
		convertIfLive();
	});
	
	$('#conversion').val(window.location.hash.replace(/^#!/, '') || 'uppercase')
	
	$('#convert').click(function(e) {
		e.preventDefault();
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
			return;
		}
		$('#input').removeClass('error');
		$('#output').val(output);
	}
	
	function convertIfLive() {
		if ($('#live').prop('checked')) {
			convert();
		}
	}
	
	$('#swap').click(function(e) {
		e.preventDefault();
		var input = $('#input').val();
		var output = $('#output').val();
		$('#input').val(output);
		$('#output').val(input);
		convertIfLive();
	});
	
	$('#clear').click(function(e) {
		e.preventDefault();
		$('#input').val('');
		$('#output').val('');
	});
	
	$('#input').on('input', function() {
		convertIfLive();
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


// from http://stackoverflow.com/a/5158301/179805
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
