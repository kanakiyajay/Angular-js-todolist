/*!
** Todo-Sortable-List Example App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/
"use strict";

var App = angular.module("todo",[]);

App.controller("TodoCtrl",function  ($scope) {

	$scope.todos = [
								{ taskName : "Write an Angular js Tutorial for Todo-List" , isDone : false },
								{ taskName : "Update jquer.in" , isDone : false },
								{ taskName : "Create a brand-new Resume" , isDone : false }
							];

	$scope.addTodo = function  () {
		$scope.todos.push({taskName : $scope.newTodo , isDone : false });
		$scope.newTodo = "";
	};

});