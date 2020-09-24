$(document).ready(function(){

	// Get existing values
	$('#inspect').click(function(){
		$element = $('#sample');
		
		// store calculated css 
		let size = $element.css('font-size');
		let leading = $element.css('line-height');
		let tracking = $element.css('letter-spacing');
		let slant = $element.css('font-style');
		console.log(slant);

		// display these values
		$('#applied-size').text(size);
		$('#applied-leading').text(leading);
		$('#applied-tracking').text(tracking);

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
		value = $(this).val(); //get slider input value
		console.log(value);

		//adjust CSS of sample
		$('#sample').css('font-size', value + 'px');
		
		//indicate value
		$('#applied-size').text(value + 'px');
	});

	$(document).on('input', '#slider-leading', function() {
		value = $(this).val(); //get slider input value
		console.log(value);

		//adjust CSS of sample
		$('#sample').css('line-height', value);
		
		//indicate value
		$('#applied-leading').text(value);
	});

	$(document).on('input', '#slider-tracking', function() {
		value = $(this).val(); //get slider input value
		console.log(value);

		//adjust CSS of sample
		$('#sample').css('letter-spacing', value + 'px');
		
		//indicate value
		$('#applied-tracking').text(value + 'px');
	});



});
	