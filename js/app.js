/*!
** Todo-Sortable-List Example App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/
"use strict";

var App = angular.module("todo", ["ui.sortable", "LocalStorageModule"]);

App.controller("TodoCtrl", function ($scope, localStorageService) {

	$scope.init = function () {

		if (!localStorageService.get("todoList")) {
			$scope.model = [
				{
					name: "Primary", list: [
						{ taskName: "Create an Angular-js TodoList", isDone: false },
						{ taskName: "Understanding Angular-js Directives", isDone: true }
					]
				},
				{
					name: "Secondary", list: [
						{ taskName: "Build an open-source website builder", isDone: false },
						{ taskName: "BUild an Email Builder", isDone: false }
					]
				}
			];
		}else{
			$scope.model = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	$scope.addTodo = function () {
		/*Should prepend to array*/
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTodo, isDone: false });
		/*Reset the Field*/
		$scope.newTodo = "";
	};

	$scope.deleteTodo = function (item) {
		var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	$scope.todoSortable = {
		containment: "parent",//Dont let the user drag outside the parent
		cursor: "move",//Change the cursor icon on drag
		tolerance: "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
	};

	$scope.changeTodo = function (i) {
		$scope.currentShow = i;
	};

	/* Filter Function for All | Incomplete | Complete */
	$scope.showFn = function (todo) {
		if ($scope.show === "All") {
			return true;
		}else if(todo.isDone && $scope.show === "Complete"){
			return true;
		}else if(!todo.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});