'use strict';

const app = angular.module('NS-SSH', ['cfp.hotkeys']);

app.config(function($locationProvider){
	// Turn off # urls
	$locationProvider.html5Mode(true);
});