angular.module('app', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home',
        controller: 'HomeController',
        controllerAs: 'records'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])


  .controller('HomeController', ['$http', 'DataService', function($http, DataService) {
    var records = this;
    records.items = [];
    records.newItem = {};

    records.fetchData = function() {
      DataService.getItems()
        .then(function(response) {
          records.items = response.data;
        })
        .catch(function(error) {
          console.error('Error fetching data:', error);
        });
    };

    // Create new item
    records.createItem = function() {
      DataService.createItem(records.newItem)
        .then(function(response) {
          records.newItem = {};
          records.fetchData();
        })
        .catch(function(error) {
          console.error('Error creating item:', error);
        });
    };

    // Initial fetch
    records.fetchData();
  }])


  .service('DataService', ['$http', function($http) {
    var baseUrl = 'http://localhost:5000';

    this.getItems = function() {
      return $http.get(baseUrl + '/items');
    };

    this.createItem = function(item) {
      return $http.post(baseUrl + '/item', item);
    };
  }]);
