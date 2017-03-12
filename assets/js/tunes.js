'use strict';

function autotown_api(path) {
    return 'http://dronin-autotown.appspot.com/api/' + path.join('/');
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function generate_uavo(objs) {
    var uav = document.implementation.createDocument(null, 'uavobjects', null);
    var settings = uav.createElement('settings');
    angular.forEach(objs, function(obj, key) {
        var object = uav.createElement('object');
        object.setAttribute('id', '0x' + obj.id.toString(16));
        object.setAttribute('name', obj.name)
        angular.forEach(obj.fields, function(vals, name) {
            var field = uav.createElement('field');
            field.setAttribute('name', name);
            if (Array.isArray(vals)) {
                field.setAttribute('values', vals.join(','));
            } else {
                field.setAttribute('values', vals);
            }
            this.appendChild(field);
        }, object);
        this.appendChild(object);
    }, settings);
    uav.documentElement.appendChild(settings);
    return new XMLSerializer().serializeToString(uav.documentElement);
}

var dronin = angular.module('dronin', ['ngMaterial', 'ngSanitize'])
    .filter('relDate', function() {
        return function(dstr) {
            return moment(dstr).fromNow();
        };
    })
    .filter('titleCase', function() {
        return function (input) {
            if (!input)
                return;
            var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

            input = input.toLowerCase();
            return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
                if (index > 0 && index + match.length !== title.length &&
                    match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                    (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                    title.charAt(index - 1).search(/[^\s-]/) < 0) {
                    return match.toLowerCase();
                }

                if (match.substr(1).search(/[A-Z]|\../) > -1) {
                    return match;
                }

                return match.charAt(0).toUpperCase() + match.substr(1);
            });
        }
    })
    .filter('simpleFormat', ['$filter', function($filter) {
        // https://github.com/RStankov/angular-simple-format/blob/1d6f1f6acdac3dd709587eaee5dde361cf890622/lib/angular_simple_format.js
        var linky = $filter('linky');
        return function(text) {
            return linky((text || '') + '').replace(/\&#10;/g, "&#10;<br>");
        };
    }])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('blue');
    });

dronin.controller('AutotuneCtrl', function($scope, $http, $mdDialog) {
    var $ctrl = this;

    $ctrl.openTune = function(tune) {
        $mdDialog.show({
            controller: 'AutotuneDialogController',
            controllerAs: '$ctrl',
            templateUrl: 'autotuneDialog.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            resolve: {
                tune: function () {
                    return tune;
                }
            }
        });
    };

    $http.get(autotown_api(['recentTunes'])).
        then(function successCallback(response) {
            $scope.tunes = response.data;
        }, function errorCallback(response) {
            $scope.error = 'Sorry, could not fetch data. Try again later.';
        }
    );
});

dronin.controller('AutotuneDialogController', function($scope, $http, $httpParamSerializer, $mdDialog, tune, $window) {
    var $ctrl = this;

    $scope.closeDialog = function() {
        $mdDialog.hide();
    }

    $scope.isArray = function(v) {
        return Array.isArray(v);
    }

    $scope.availableObjects = [];
    $scope.selectedObjects = [];

    $scope.isIndeterminate = function() {
        return ($scope.selectedObjects.length !== 0 &&
        $scope.selectedObjects.length !== $scope.availableObjects.length);
    };

    $scope.isChecked = function() {
        return $scope.selectedObjects.length === $scope.availableObjects.length;
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };

    $scope.toggleAll = function() {
        if ($scope.selectedObjects.length === $scope.availableObjects.length) {
            $scope.selectedObjects = [];
        } else {
            $scope.selectedObjects = $scope.availableObjects.slice(0);
        }
    };

    $ctrl.downloadRawObjects = function() {
        var objs = [];
        // mark tunes as new when they are imported to trigger wizard
        angular.forEach($scope.tune.Orig.rawSettings, function(value, key) {
            if ($scope.selectedObjects.indexOf(value.name) === -1)
                return;
            if (value.name == "SystemIdent")
                value.fields.NewTune = 'TRUE';
            objs.push(value);
        }, objs);
        download('user-settings.uav', generate_uavo(objs));
    };

    $ctrl.googleMaps = function(lat, lon) {
        $window.location.href = 'https://www.google.com/maps/@' + lat + ',' + lon + ',12z';
    }

    $http.get(autotown_api(['tune?' + $httpParamSerializer({tune: tune})])).
        then(function successCallback(response) {
            $scope.tune = response.data;

            var objs = [];
            angular.forEach($scope.tune.Orig.rawSettings, function(value, key) {
                this.push(value.name);
            }, objs);
            $scope.availableObjects = objs;
            $scope.toggleAll();
        }, function errorCallback(response) {
            $scope.error = 'Sorry, could not fetch data. Try again later.';
        }
    );
});
