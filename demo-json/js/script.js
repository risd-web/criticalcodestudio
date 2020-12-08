
$(document).ready(function() {

    let html = "";

    $.getJSON('js/emoji.json', function(data) {
    
        $.each(data, function(i, emoji){
            // build the html  here in the loop
            html += `
            <div class="emoji-container">
            	<div class="char">${emoji.char}</div>
            	<div class="char">${emoji.name}</div>
            </div>`
           
        });

        // append to the container
        $('main').append(html);
    });

});