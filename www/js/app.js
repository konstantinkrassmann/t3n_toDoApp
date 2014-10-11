// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller("ToDoController", function($scope, $ionicPopup, $cordovaVibration){
	//Contains the amount of done toDos;
	$scope.totalDone = 0;
	//Contains the ToDos
	$scope.toDos = [
		{		
			title:"Müll rausbringen", 
			done: false
		},
		{
			title:"Bild aufhängen", 
			done: false
		},
		{
			title:"Staub saugen", 
			done: false
		}		
	]
	
	$scope.checkDone = function (toDo){		
		if(toDo.done)
			$cordovaVibration.vibrate(100);
	};
	
	/**
	* Calculates how many toDos are already done
	**/
	$scope.calculateDone = function (){
	
		$scope.totalDone = 0;
		
		for(var i in $scope.toDos)
		{
			if($scope.toDos[i].done)
				$scope.totalDone ++;
		}
	};
	
	/**
	*	Shows a popout to enter the new toDo's title
	**/
	$scope.createToDo = function () 
	{		
		$scope.popupData = {};
		var toDoPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="popupData.newToDoTitle">',
			title: 'Neues ToDo anlegen',
			subTitle: 'Bitte geben Sie den Titel ein',
			scope: $scope,
			buttons: [
			  { text: 'Abbrechen'},
			  {
				text: '<b>Speichern</b>',
				type: 'button-positive',
				onTap: function(e) {
				  if($scope.popupData.newToDoTitle != ""){
					
					$scope.toDos.push({
						title: $scope.popupData.newToDoTitle,
						done: false
					});
				  }
				}
			  },
			]
		});
	};
	
	$scope.calculateDone();
});