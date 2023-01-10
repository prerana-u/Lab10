(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"fid\":\"" + $scope.fid + "\", \"name\":\"" + $scope.name + "\", \"description\":\"" + $scope.description + "\", \"price\":\"" + $scope.price + "\", \"spice\":\"" + $scope.spice + "\", \"ftype\":\"" + $scope.ftype + "\"}";

                fetch('http://localhost:3000/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.fid=""
                $scope.name=""
                $scope.description=""
                $scope.price=""
                $scope.spice=""
                $scope.ftype=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.fid
                console.log(selectedId)
                $scope.name = selectedId['name']
                $scope.price = selectedId['price']
                $scope.description = selectedId['description']
                $scope.spice = selectedId['spice']
                $scope.ftype = selectedId['ftype']
            }

            $scope.updateEntry = function () {
                var newData = "{\"fid\":\"" + $scope.fid['fid'] + "\", \"name\":\"" + $scope.name + "\", \"description\":\"" + $scope.description + "\", \"price\":\"" + $scope.price + "\", \"spice\":\"" + $scope.spice + "\", \"ftype\":\"" + $scope.ftype + "\"}";
                console.log(newData)
                fetch('http://localhost:3000/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.text()) 
                .then(text => console.log(text))
                .catch(err => console.log(err))
               // console.log(response)
                $scope.fid=""
                $scope.name=""
                $scope.description=""
                $scope.price=""
                $scope.spice=""
                $scope.ftype=""
            };
        })

        .controller('searchController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.data1 = response.data
            })
            $scope.getData = function () {
                var searchJson = { searchid: $scope.searchid.fid }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3000/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.fid }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3000/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })
                .when("/search", {
                    templateUrl: "search.html",
                    controller: "searchController"
                })
                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();