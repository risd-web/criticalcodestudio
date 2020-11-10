$(function(){

	var topic;
	var peers = new Set();
	var input = document.getElementById('input');
	var output = document.getElementById('output');
	
	// this is your array that will store
	// peer info as needed
	let yourPeers = {};

	// peer in
	let yourSignoff = false;
	let killSwitch = false;


	setup();
	async function setup () {

	  // sets up peer sockets
	  var peerEvents = beaker.peersockets.watch();

	  // sets up joining / leaving behavior
	  peerEvents.addEventListener('join', e => {
	    console.log('join', e);
	    peers.add(e.peerId);
	    
	    // setup your own peer object here
	    // you can add whatever 'metadata' you find useful
	    // as a 'key': 'value' pair with a default/placeholder values;
	    yourPeers[e.peerId] = {
	    	'name': '',
	    	'status': 'on'
	    };

	    output.innerHTML += `<em>Peer ${e.peerId} has joined</em>\n`
	  });

	  peerEvents.addEventListener('leave', e => {
	    console.log('leave', e)
	    peers.delete(e.peerId)
	    output.innerHTML += `<em>Peer ${e.peerId} has left</em>\n`;
	  	delete yourPeers[e.peerId];
	  });


	  // sets up chat 
	  topic = beaker.peersockets.join('chat');


	  // listener to your own message input
	  input.addEventListener('keydown', e => {
	    if (e.keyCode !== 13) return

	    output.innerHTML += `<strong>You said:</strong> `;

		parseMessage('', input.value);
		
	    output.append(`${input.value}\n`)


	    var message = new TextEncoder('utf-8').encode(input.value)
	    input.value = ''

	    for (let peer of peers) {
	      console.log('sending to', peer);
	      topic.send(peer, message);
	    }
	  });


	  // listens to messages of peers
	  topic.addEventListener('message', e => {
	    console.log('message', e);
	    
	    let text = new TextDecoder().decode(e.message);

	    parseMessage(e.peerId, text);

	    
	    // get peer name based on their id
	    let peerName = yourPeers[e.peerId]['name']; 

	    if( peerName !== '' && typeof peerName !== 'undefined'){
	    	output.innerHTML += `<strong> ${peerName} says:</strong> `
	    }else{
	    	output.innerHTML += `<strong>Peer ${e.peerId} says:</strong> `
	    }

	    output.append(`${text}\n`)
	  });
	}


	function parseMessage(id, message){
	// this is where you could set up different "message" listeners
	// instead of event listners
		console.log(yourPeers, 'id', id, 'message', message);


		// a class toggle example
		if(message.includes('party')){
			$('body').toggleClass('party');
		}

		// what if you everything triggered via commands, instead of using contacts?
		// it could be like you had to know the agreed upon "secret keywords"  to participate
		
		if(message.includes('name is')){;

			// stores the second half is the string after splitting it
			let name = message.split('name is ')[1];

			console.log(name, id);

			//update the peer object in the array
			if(id !== ''){
				yourPeers[id]['name'] = name;
			}
		}


		if(message.includes('signoff')){
			// or something like that
			// store who signed off or not in json

			if(id !== ''){
				// set the peer status to off
				yourPeers[id]['status'] = 'off';	
			}else{
				// you need to manage your own data 
				// separately from your peers
				// because your self isn’t stored in peerdata
				yourSignoff =  true;
			}
			checkForSignoffs()

		}

	}


	function checkForSignoffs(){
		// checks the status of each peer and flips the kill switch
		// if everyone has declared signoff

		for( const i in yourPeers){
			//check if everyone has signed off
			p = yourPeers[i];

			if( p.status == "on" ){
				// someone hasn’t signed off yet
				killSwitch = false;
			}else{
				// enable killSwitch
				killSwitch = true;
			}			
		}

		if(yourSignoff && killSwitch){
			//if both you’ve signed off and everyone else has signed off
			console.log('end the session');

			$('body').toggleClass('black'); // or something like that
		}

	}
	


});