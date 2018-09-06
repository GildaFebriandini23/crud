// public/baju.js
var bajusManager = angular.module('bajusManager', []);

function mainControllers($scope, $http) {
    $scope.formData = {};
    
 // when landing on the page, get all cars and show them
    $http.get('/baju/')
        .success(function(data) {
            $scope.bajus = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

// when submitting the add form, send the text to the node API
    $scope.createBaju = function() {
        $http.post('/baju/', $scope.formData)
            .success(function(data) {
                // clear the form so our user is ready to enter another
                     $scope.formData = {}; 
   
  $http.get('/baju/')
   .success(function(data) {
    $scope.bajus = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
    
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a car after checking it
    $scope.deleteBaju = function(id) {
        $http.delete('/baju/' + id)
            .success(function(data) {    
  $http.get('/baju/')
   .success(function(data) {
    $scope.bajus = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // update a car
    $scope.updateBaju = function() {
        $http.put('/baju/' + $scope.formDataUpdate.id, $scope.formDataUpdate)
            .success(function(data) {
                // clear the form so our user is ready to enter another                                
                $scope.formDataUpdate = {}; 
    
  $http.get('/baju/')
   .success(function(data) {
    $scope.bajus = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
    
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}