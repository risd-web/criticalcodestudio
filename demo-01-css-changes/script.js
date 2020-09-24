$(document).ready(function(){

	// Get existing values
	$('#inspect').click(function(){
		$element = $('#sample');
		//reset sample
		$('#sample').removeAttr('style')
		
		// store calculated css 
		let size = $element.css('font-size');
		let leading = $element.css('line-height');
		let tracking = $element.css('letter-spacing');
		let slant = $element.css('font-style');

		// display these values
		$('#applied-size').text(size);
		$('#applied-leading').text(leading);
		$('#applied-tracking').text(tracking);

		// toggle data attribute on roman
		if(slant == 'italic'){
			$('#options-slant').attr('data-slant', 'italic');
		}else{
			$('#options-slant').attr('data-slant', 'roman');
		}

		// set these values on the sliders
		$('#slider-size').val( size.replace('px','') );

	});

	// input sliders

	$(document).on('input', '#slider-size', function() {
		let sizevalue = $(this).val(); //get slider input value

		//adjust CSS of sample
		$('#sample').css('font-size', sizevalue + 'px');
		
		//indicate value
		$('#applied-size').text(sizevalue + 'px');
	});

	$(document).on('input', '#slider-leading', function() {
		let leadingvalue = $(this).val(); //get slider input value

		//adjust CSS of sample
		$('#sample').css('line-height', leadingvalue);
		
		//indicate value
		$('#applied-leading').text(leadingvalue);
	});

	$(document).on('input', '#slider-tracking', function() {
		let trackingvalue = $(this).val(); //get slider input value

		//adjust CSS of sample
		$('#sample').css('letter-spacing', trackingvalue + 'px');
		
		//indicate value
		$('#applied-tracking').text(trackingvalue + 'px');
	});


	// italic toggle

	$('.slant-option').click(function(){
		let slantvalue = $(this).attr('id');
		$('#options-slant').attr('data-slant', slantvalue);

		if(slantvalue == 'italic'){
			$('#sample').css('font-style', 'italic');
		}else{
			$('#sample').css('font-style', 'normal');
		}
	});


});
	