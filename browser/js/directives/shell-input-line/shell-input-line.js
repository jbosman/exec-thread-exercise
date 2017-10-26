app.directive('shellInputLine', () => {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/shell-input-line/shell-input-line-template.html',
		controller: ($scope, hotkeys, shellDetails, shellFactory, cmdLogFactory) => {
			$scope.submitCmd = () => {
				shellFactory.submitCmd($scope.shellCmd);
				$scope.shellCmd = '';
			}

			$scope.shellPrompt = () => shellDetails.prompt;

			hotkeys.add({
				combo: 'up',
				description: 'Scroll up through previous commands.',
				allowIn: ['INPUT'],
				callback: function() {
					$scope.shellCmd = cmdLogFactory.scrollLogUpKey();
				}
			})
			hotkeys.add({
				combo: 'down',
				description: 'Scroll down through previuos commands.',
				allowIn: ['INPUT'],
				callback: function() {
					$scope.shellCmd = cmdLogFactory.scrollLogDownKey();
				}
			})

		}
	}
});