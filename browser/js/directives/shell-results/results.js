app.directive('shellResults', () => {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/shell-results/results-template.html',
		controller: function($scope, shellFactory){
			$scope.fetchResults = () => {
				return shellFactory.fetchResults();
			}
		}
	}
})