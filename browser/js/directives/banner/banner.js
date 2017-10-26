app.directive('banner', () =>{
	return {
		restrict: 'E',
		templateUrl: 'js/directives/banner/banner-template.html',
		controller: ($scope, $sce, themeFactory) => {
			$scope.getThemeText = () => $sce.trustAsHtml(themeFactory.selectedTheme().bannerText);
		}
	}
});