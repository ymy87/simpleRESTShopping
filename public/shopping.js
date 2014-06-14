
        var model = {
            user: "Timothy",
			cutoff: 7,
            items: 
[
 { "action": "Flowers", "done": false, "price":1, "quantity":5 },
 { "action": "Shoes",   "done": false, "price":2, "quantity":4 },
 { "action": "Tickets", "done": true,  "price":3, "quantity":30 },
 { "action": "Coffee",  "done": false, "price":4, "quantity":2 }
]
        };

        var todoApp = angular.module("todoApp", []);

        // modify this to show only those items whose quantity is >= cutoff
        todoApp.filter("bigOrderItems", function () {
            return function (items, cutoff) {
                var resultArr = [];
                angular.forEach(items, function (item) {
                    if (item.quantity>=cutoff ) {
                        resultArr.push(item);
                    }
                });
                return resultArr;
            }
        });
        
        todoApp.filter("checkedItems", function () {
            return function (items, showComplete) {
                var resultArr = [];
                angular.forEach(items, function (item) {
                    if (item.done == false || showComplete == true) {
                        resultArr.push(item);
                    }
                });
                return resultArr;
            }
        });

        todoApp.controller("ToDoCtrl", function ($scope) {
            $scope.todo = model;

            $scope.incompleteCount = function () {
                var count = 0;
                angular.forEach($scope.todo.items, function (item) {
                    if (!item.done) { count++ }
                });
                return count;
            }

	       $scope.totalcost = function(){
	        var sum=0;

	        angular.forEach($scope.todo.items, function(item){
				if (item.done == false)
	          		sum += item.price*item.quantity;
	        });
	        return sum;
           }

	       $scope.totalItems = function(){
	        var count=0;

	        angular.forEach($scope.todo.items, function(item){
				if (item.done == false)
	          		count += item.quantity;
	        });
	        return count;
           }

            $scope.warningLevel = function () {
                return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
            }

            $scope.addNewItem = function (actionText) {
                $scope.todo.items.push({ action: actionText, price:0, quantity:0, done: false });
            }
            
            var commands = {
                'new item *var': function(val){
                    $scope.newItem = val;
                    $scope.$apply();
                }
            };

        });
