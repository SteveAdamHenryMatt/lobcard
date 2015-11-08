angular.module('snapCard', [
  'ngRoute',
  'snapCard.app'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './templates/app.html',
      controller: 'AppController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
