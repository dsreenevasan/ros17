(function () {
    'use strict';

    angular
        .module('ros')
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['$http','$rootScope'];
    function ConfigService($http,$rootScope) {
        var service={};
        var server = {
            "local": "localhost",
            "wedo" : "wedo.kurukshetra.org.in",
            "port": "8080"
        };
        service.BaseURI = BaseURI;
        return service;

        function BaseURI()
        {
            return "http://"+server.wedo;
        }

    }
})();