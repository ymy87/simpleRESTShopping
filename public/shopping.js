var model = {
    user: "Timothy",
    cutoff: 0,
    items: []

};


var todoApp = angular.module("todoApp", []);

todoApp.run(function($http) {
    $http.get("/showall.json").success(function(data) {
        model.items = data;
    })
})

// modify this to show only those items whose quantity is >= cutoff
todoApp.filter("bigOrderItems", function() {
    return function(items, cutoff) {
        var resultArr = [];
        angular.forEach(items, function(item) {
            if (item.quantity >= cutoff) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});

todoApp.filter("checkedItems", function() {
    return function(items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function(item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});

todoApp.controller("ToDoCtrl", function($scope, $http) {
    $scope.todo = model;

    $scope.incompleteCount = function() {
        var count = 0;
        angular.forEach($scope.todo.items, function(item) {
            if (!item.done) {
                count++
            }
        });
        return count;
    }


/*
            Here is where we handle all of the interaction with the server
            using a simple http connection... 
            */
    $scope.putItem = function(item) {
        console.log("putting: " + JSON.stringify(item));
        $http.put("/model/" + item.id, item).success(function(data, status, headers, config) {
            console.log(JSON.stringify(['Success', data, status, headers, config]))
        }).error(function(data, status, headers, config) {
            console.log(JSON.stringify(['Error', data, status, headers, config]))
        })
    }

    $scope.postItem = function(item) {
        console.log("posting: " + JSON.stringify(item));
        $http.post("/model", item).success(function(data, status, headers, config) {
            console.log(JSON.stringify(['Success', data, status, headers, config]))
        }).error(function(data, status, headers, config) {
            console.log(JSON.stringify(['Error', data, status, headers, config]))
        })
    }

    $scope.getItems = function() {
        $http.get("/showall.json").success(function(data) {
            $scope.todo.items = data;
        })
    };
    
    $scope.deleteItem = function(item) {
        $http.delete("/model/"+item.id).success(function() {
            console.log("just deleted "+JSON.stringify(item));
            $scope.getItems();
        })
    };

    $scope.totalcost = function() {
        var sum = 0;

        angular.forEach($scope.todo.items, function(item) {
            if (item.done == false) sum += item.price * item.quantity;
        });
        return sum;
    }

    $scope.totalItems = function() {
        var count = 0;

        angular.forEach($scope.todo.items, function(item) {
            if (item.done == false) count += item.quantity;
        });
        return count;
    }

    $scope.warningLevel = function() {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }

    $scope.addNewItem = function(actionText) {
        var len = $scope.todo.items.length;
        var item = {
            id: len,
            action: actionText,
            price: 0,
            quantity: 0,
            done: false
        };
        $scope.postItem(item, len);
        $scope.getItems();
        $scope.$apply();
        //$scope.todo.items.push(item);
    }

    var commands = {
        'new item *var': function(val) {
            $scope.newItem = val;
            $scope.$apply();
        }
    };

});
