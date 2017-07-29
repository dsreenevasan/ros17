(function(){
    'use strict';
    angular
        .module('ros')
        .controller('LeaderBoardController', LeaderBoardController);
    LeaderBoardController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope'];
    function LeaderBoardController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope){
        var ctrl = this;

        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        checkForCookies();
        getLeaderBoard();

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

        function checkForCookies() {
            if($cookieStore.get('userDetails')){
                ctrl.loggedIn = true;
                ctrl.userDetails = $cookieStore.get('userDetails');
                //Materialize.toast("Logged In", 3000);
            }
        }

        function getLeaderBoard() {
            var obj = {
                accessToken: ctrl.userDetails.accessToken
            };

            ROSService.GetLeaderBoard(obj).then(function(response){
                if(response.status == 200){
                    ctrl.leaderBoard = response.data;
                    console.log(JSON.stringify(ctrl.leaderBoard.leaderboard));
                    var date;
                    ctrl.lastLevelTime = [];
                    angular.forEach(ctrl.leaderBoard.leaderboard, function(value, key){
                        date = new Date(ctrl.leaderBoard.leaderboard[key][1]);
                        console.log(date.getDate() + "/" + parseInt(date.getMonth()+1) + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                        ctrl.lastLevelTime[key] = date.getDate() + "/" + parseInt(date.getMonth()+1) + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    });
                    console.log(ctrl.lastLevelTime);
                    ctrl.dataLoaded = true;
                }
                else{
                    Materialize.toast("Error! Kindly Check your Internet Connection!", 3000);
                }
            })
        }

    }

})();