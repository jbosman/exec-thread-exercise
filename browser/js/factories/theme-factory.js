app.factory('themeFactory', () =>{
	
	const DOOGIE_THEME = 'DOOGIE';
	const DOUGIE_THEME = 'DOUGIE';
	let currentTheme = DOOGIE_THEME;

	const themes = {
		DOOGIE: {
			audio: 'audio/DoogieHowserTheme.mp3',
			bannerText: 'PERSONAL TERMINAL OF DOOGIE HOWSER, M.D.',
		},
		DOUGIE: {
			audio: 'audio/TeachMeHowToDougie.mp3',
			bannerText: 'PERSONAL TERMINAL OF DO<s>O</s><ins>U</ins>GIE <s>HOWSER</s>, M.<s>D</s><ins>C</ins>',
		},
	}

	function selectedTheme(){
		return themes[currentTheme];
	}

	function updateTheme(theme){
		if(~ Object.keys(themes).indexOf(theme)){
			currentTheme = theme;
		}
	}

	return {
		DOOGIE_THEME,
		DOUGIE_THEME,
		selectedTheme,
		updateTheme
	}
})