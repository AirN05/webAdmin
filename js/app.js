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

    .controller("editController", function($scope,$http, $location, $log, $route){  

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
    $scope.days=i; html
    $log.log($scope.days);
  }*/

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };

    

        $http.get('data/shedule.json').success(function(data, status, headers, config){
        $scope.shedule = data;
        $log.log($scope.selected);
        $log.log($scope.shedule);
      
            })
    

    $scope.changeShedule=function(){
        $http.put('data/shedule.json',  JSON.stringify($scope.selected))
            .success(function(data, status, headers, config){
            $log.log(status);
            $route.reload();
        })
    }

    


        $scope.sendMessage=function(){
            // отправка отзыва на почту
        }

        $http.get('').success(function(data){
            $scope.contacts=data;

        })

        $http.get('data/employ.json').success(function(data){
            $scope.employ=data;

        })

        $http.get('data/shop.json').success(function(data){
            $scope.shop=data;

        })

        $http.get('data/images.json').success(function(data){
            $scope.images=data;

        })


        $http.get('data/price.json').success(function(data){
            $scope.price=data;

        })

        $scope.changePrice=function(){
            $http.put('data/price.json', JSON.stringify($scope.priceSelected))
            .success(function(data, status, headers, config){
            $log.log(status);
            $route.reload();
        })

        }  

        $scope.addPrice=function(){
                $log.log("hi");
                $http.post('data/price.json', {name: $scope.newService, price: $scope.newPrice, option: $scope.newOption})
                 .success(function(data, status, headers, config){
                     $log.log(status);
                     $log.log(data);
                     $scope.newService=null;
                     $scope.newPrice=null;
                     $scope.newOption=null;
                     
                })
            }

        $scope.addEmploy=function(){
                $log.log("hi");
                $http.post('data/employ.json', {name: $scope.newName, image: $scope.newPhoto, describe: $scope.newCity})
                 .success(function(data, status, headers, config){
                     $log.log(status);
                     $log.log($scope.newPhoto);
                     $scope.newName=null;
                     $scope.newPhoto=null;
                     $scope.newCity=null;
                     

                })
            }

            $scope.changeEmploy=function(){
                $log.log($scope.employSelected);
                $http.put('data/employ.json', JSON.stringify($scope.employSelected))
                    .success(function(data, status, headers, config){
                    $log.log(status);
                    $route.reload();

        })

        }  



})

   
// 

    
.directive("menu", function(){
    return {
        templateUrl:"assets/directives/menu.html",
        replace: true,
        restrict: 'E',
        

            controller: function($scope,$log,$http){

        $http.get('data/menu.json')
            .success(function(data, status, headers, config){
                 $scope.menu = data;})  

            /* $http.get('data/shedule.json').success(function(data, status, headers, config){
        $scope.employ = data;
        $log.log($scope.selected);
        $log.log($scope.employ);
      
            })*/

        
}
}})

.directive("auth", function(){
    return {
        templateUrl:"assets/directives/auth.html",
        replace: true,
        restrict: 'E',
        

            controller: function($scope,$log,$http, $rootScope, $location){

                if (!$rootScope.checkAdmin) $location.path('/page/0');


                $scope.auth=function(){

               // $scope.checkAdmin=false;
                $log.log($scope.login);
                $log.log($scope.password);
                $http.post('', {login: $scope.login, password: $scope.password})
                    .success(function(data){
                        $log.log("ok");

                    })

                    if ($scope.login=='admin' && $scope.password=='admin'){
                    $rootScope.checkAdmin=true;
                    $scope.control=true;
                    $log.log( $rootScope.checkAdmin);
                }
                    //$scope.login=null;
                   // $scope.password=null;
            }

            $scope.logout=function(){
                $rootScope.checkAdmin=false;
                $log.log("out");
                $location.path('/index.html');

            }

}
}})









