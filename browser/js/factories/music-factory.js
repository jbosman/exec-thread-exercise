app.factory('musicFactory', (themeFactory) => {

	const audio = document.createElement('audio');

	updateAudio();

	function play(){ audio.play(); }

	function pause(){ audio.pause(); }

	function togglePlayPause(){ audio.paused ? audio.play() : audio.pause(); }

	function updateAudio(){
		audio.src = themeFactory.selectedTheme().audio;
		audio.load();
		audio.loop = true;
		play();
	}

	return {
		play,
		pause,
		togglePlayPause,
		updateAudio
	}

});