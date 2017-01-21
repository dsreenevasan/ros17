(function () {
    'use strict';

    angular
        .module('ros')
        .factory('ROSService',ROSService);

    ROSService.$inject = ['$http', '$state', '$rootScope', '$timeout', 'ConfigService'];

    function ROSService($http, $state, $rootScope, $timeout, ConfigService){
        
        var service = {};

        service.Login = Login;
        service.TrackUser = TrackUser;
        service.CheckAnswer = CheckAnswer;
        service.GetLeaderBoard = GetLeaderBoard;
        service.GetClues = GetClues;

        return service;

        function Login(params) {
            return $http.post(ConfigService.BaseURI() + '/api/login', params).then(handleSuccess, handleRemoteError);
        }

        function TrackUser(params){
            return $http.post(ConfigService.BaseURI() + '/api/getQuestion', params).then(handleSuccess, handleRemoteError);
        }

        function CheckAnswer(params){
            return $http.post(ConfigService.BaseURI() + '/api/submit', params).then(handleSuccess, handleRemoteError);
        }

        function GetLeaderBoard(params){
            return $http.post(ConfigService.BaseURI() + '/api/leaderboard', params).then(handleSuccess, handleRemoteError);
        }

        function GetClues(params){
            return $http.post(ConfigService.BaseURI() + '/api/getClues', params).then(handleSuccess, handleRemoteError);
        }

        function handleRemoteError(data) {
            return data;
        }

        function handleSuccess(data) {
            return data;
        }

    }

})();
