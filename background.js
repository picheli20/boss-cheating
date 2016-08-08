$(document).ready(function() {
	'user strict';
	var keyCode = 27;
	var isActive = false;
	var alreadyStarted = false;
	var currentTheme = 'f';

	if(localStorage.getItem('activate') && localStorage.getItem('activate') == 'true'){
		isActive = true;
		start();
	}

	if(localStorage.getItem('currentTheme')){
		currentTheme = localStorage.getItem('activate');
	}


	function getRandomUrl() {
		var frontThemes = [
			'https://i.imgur.com/m9kPNmB.png',
			'http://i.imgur.com/tzcmqcp.png',
			'http://i.imgur.com/6bIdNCP.png',
			'http://i.imgur.com/WYn31BX.png',
			'http://i.imgur.com/uZogb8K.png',
			'http://i.imgur.com/ACoLV10.png',
			'http://i.imgur.com/6QKprtW.png'
		];
		var backThemes = [
			'http://i.imgur.com/sllfZij.png',
			'http://i.imgur.com/6QKprtW.png'
		];

		var searchThemes = currentTheme == 'f' ? frontThemes : backThemes;

		return searchThemes[Math.floor(Math.random()*searchThemes.length)];
	}
	jQuery.fn.center = function () {
	    return this;
	}

	function start(){
		if(alreadyStarted){ 
			return;
		}
		alreadyStarted = true;
		var bodyCode = $('body').html();
		$('body').empty();
		$('body').append(
			'<div id="bossCeatingContainer">' +
				'<div id="bossCeating-dragArea"></div>' +
				'<div id="messageArea">Change Time!</div>' +
				'<div id="nwgrip"></div>' +
				'<div id="negrip"></div>' +
				'<div id="swgrip"></div>' +
				'<div id="segrip"></div>' +
				'<div id="bossCeatingContent"></div>' +
			'</div>'
		);
		$('#bossCeatingContent').append(bodyCode);
		$('body').append('<img id="fakeContent" name="fakeContent"/>');
		realoadImage();
		$( "#bossCeatingContainer" ).resizable({handles: {
	        'nw': '#nwgrip',
	        'ne': '#negrip',
	        'sw': '#swgrip',
	        'se': '#segrip'
    	}});
		$( "#bossCeatingContainer" ).draggable({handles: '#bossCeating-dragArea'});
	};

	var changeTimer = null;

	function realoadImage() {

		$('#messageArea').hide();
		$('#fakeContent').attr('src', getRandomUrl());
		if(changeTimer !== null){
			clearTimeout(changeTimer);
		}

		changeTimer = setTimeout(function(){
			$('#messageArea').show();
		}, 300000);

	}


	$('body').keydown(function(key){
		if(key.keyCode === 78 && key.altKey){
			realoadImage();
		}

		if(key.keyCode === 65 && key.altKey){
			isActive = !isActive;
			localStorage.setItem('activate', isActive);
			if(!isActive){
				location.reload();
				return;
			}
			start();
		}

		if(key.keyCode === 83 && key.altKey){
			if(currentTheme == 'f'){
				currentTheme = 'b';
			}else{
				currentTheme = 'f';
			}

			localStorage.setItem('currentTheme', currentTheme);
			realoadImage();
		}

		if(key.keyCode === keyCode){
			$('#bossCeatingContainer').toggle();
		}
	});


});