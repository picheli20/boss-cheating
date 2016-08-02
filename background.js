$(document).ready(function() {
	'user strict';
	var keyCount = 0;
	var keyCode = 27;
	var isActive = false;
	var alreadyStarted = false;
	if(localStorage.getItem('activate') && localStorage.getItem('activate') == 'true'){
		isActive = true;
		start();
	}


	function getRandomUrl() {
		var searchThemes = [
			'https://i.imgur.com/m9kPNmB.png'
		];

		return searchThemes[Math.floor(Math.random()*searchThemes.length)];
	}

	function start(){
		if(alreadyStarted){
			return;
		}
		alreadyStarted = true;
		var bodyCode = $('body').html();
		$('body').empty();
		$('body').append('<div id="bossCeatingContent" style="background-color: #fff !important;z-index: 9999999 !important;width: 50% !important;height: 50% !important;left: 25% !important;top: 50% !important;position: absolute !important;overflow-y: scroll !important;overflow-x: hidden !important;"></div>');
		$('#bossCeatingContent').append(bodyCode);
		$('body').append('<img id="fakeContent" name="fakeContent" style="position: absolute;width: 100% !important;height: 100% !important;z-index: 9999998 !important;border: 0 !important;"/>');

		$('#fakeContent').attr('src', getRandomUrl());

	};



	$('body').keydown(function(key){
		if(key.keyCode === 65 && key.altKey){
			isActive = !isActive;
			start();
			localStorage.setItem('activate', isActive);
		}

		if(key.keyCode === keyCode){
			if(keyCount > 0){
				$('#bossCeatingContent').toggle();
				keyCount = 0;
			} 
			keyCount++;
		}
	});


});