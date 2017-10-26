app.directive('shellIntro', () => {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/shell-intro/shell-intro-template.html',
		controller: ($scope) => {
			const date = new Date();
			let dateString = date.toString();
			dateString = dateString.slice(0, dateString.indexOf(date.getFullYear()) + 4);
			$scope.date = `${dateString}`;

			// document.addEventListener("DOMContentLoaded", function(){
			// 	console.log('got here')
			// 	Typed.new(".intro", {
			// 		strings: ["First sentence.", "Second sentence."],
			// 		typeSpeed: 0
			// 	});
			// });
		}
	}

});