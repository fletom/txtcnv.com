function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

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
