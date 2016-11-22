var app = angular.module("undergroundAdmin", ["ngRoute", "ngResource"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/page/:id", {
                templateUrl : function(page){
                    
        	return "assets/page-"+page.id+".html"
        },
        controller: "pagesController"
    })
    .otherwise("/page/0")
   
})

    .controller("pagesController",function($scope,$http,$rootScope,$routeParams, $location, $log){
        $scope.page=parseInt($routeParams.id) || 0;
         

    })

    .controller("editController", function($scope,$http, $location, $log){  

        $scope.date = new Date();

  $scope.minDate = new Date(
      $scope.date.getFullYear(),
      $scope.date.getMonth() - 2,
      $scope.date.getDate());

  $scope.maxDate = new Date(
      $scope.date.getFullYear(),
      $scope.date.getMonth() + 2,
      $scope.date.getDate());
   
  /*for(i=$scope.minDate; i<$scope.maxDate; i++){
    $log.log(i);
    $scope.days=i;
    $log.log($scope.days);
  }*/

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };

    $scope.choiceEmp=function(){

        $http.get('data/shedule.json').success(function(data, stdatus, headers, config){
        $scope.employ = data;
        $log.log($scope.selected);
        $log.log($scope.employ);
      
            })
    }

    $scope.change=function(){
        $http.put('data/shedule.json',  JSON.stringify($scope.selected))
            .success(function(data, stdatus, headers, config){
            $log.log(status);
        })
    }
})





.directive("menu", function(){
    return {
        templateUrl:"assets/directives/menu.html",
        replace: true,
        restrict: 'E',
        

            controller: function($scope,$log,$http){

        $http.get('data/menu.json')
            .success(function(data, status, headers, config){
                 $scope.menu = data;})  

             $http.get('data/shedule.json').success(function(data, status, headers, config){
        $scope.employ = data;
        $log.log($scope.selected);
        $log.log($scope.employ);
      
            })

        
}
}})








