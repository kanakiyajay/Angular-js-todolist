/*!
** Todo-Sortable-List Example App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/
"use strict";

var App = angular.module("todo",["ui.sortable","LocalStorageModule"]);

App.controller("TodoCtrl",function  ($scope,localStorageService) {

	$scope.init = function  () {
		if (localStorageService.get("todoList")===null) {
			/* The Model */
			$scope.todos = [
				{ taskName : "Create an Angular-js TodoList" , isDone : false }
			];
		}else{
			$scope.todos = localStorageService.get("todoList");
		}
	};

	$scope.addTodo = function  () {
		/*Should prepend to array*/
		$scope.todos.splice(0,0,{taskName : $scope.newTodo , isDone : false });
		/*Reset the Field*/
		$scope.newTodo = "";
	};

	$scope.deleteTodo = function  (index) {
		$scope.todos.splice(index, 1);
	};

	$scope.todoSortable = {
		containment : "parent",//Dont let the user drag outside the parent
		cursor : "move",//Change the cursor icon on drag
		tolerance : "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
	};


	$scope.$watch("todos",function  (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});