app.directive('shell', () => {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/shell/shell-template.html',
		controller: (musicFactory, hotkeys, shellFactory) => { 
			// musicFactory.play(); 

			hotkeys
			.add({
				combo: 'command+k',
				description: 'Clear window of previous results.',
				allowIn: ['INPUT'],
				callback: function() {
					shellFactory.clearResults();
				}
			})
			hotkeys.add({
				combo: 'command+p',
				description: 'Toggle music between play and pause. You\'re welcome...',
				allowIn: ['INPUT'],
				callback: function(event) {
					musicFactory.togglePlayPause();
					event.preventDefault();
				}
			})
		}
	}
});