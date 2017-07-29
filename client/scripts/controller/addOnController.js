(function(){
    'use strict';
    angular
        .module('ros')
        .controller('AddOnController', AddOnController);
    AddOnController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope', '$location'];
    function AddOnController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope, $location){
        var ctrl = this;

        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        ctrl.isSubmitting = false;
        ctrl.currentState = $rootScope.current;
        ctrl.showAd = false;
        console.log($rootScope.current);
        if(ctrl.currentState == 'surprise1'){
            ctrl.addOnLevel = 26;
        }
        else if(ctrl.currentState == 'qr2'){
            ctrl.addOnLevel = 27;
        }
        else if(ctrl.currentState == 'transpose'){
            ctrl.addOnLevel = 28;
        }


        checkForCookies();
        trackUserLevel();

        window.addEventListener('keydown', function(event){
            if(event.keyCode == 73 && event.ctrlKey && event.shiftKey){
                event.preventDefault();
            }
        });

        ctrl.clickSubmit = function (event) {
            if(event.keyCode == 13){
                ctrl.submit();
            }
        };

        function checkForCookies() {
            if($cookieStore.get('userDetails')){
                ctrl.userDetails = $cookieStore.get('userDetails');
                ctrl.loggedIn = true;
                //$location.path("main/level1").replace()
            }
            else{
                $state.go('login');
            }
        }

        function trackUserLevel(){
            ctrl.answer = undefined;
            var obj = {
                accessToken: ctrl.userDetails.accessToken,
                level: ctrl.addOnLevel
            };

            ROSService.GetAddOn(obj).then(function(response){
                if(response.status == 200){
                    ctrl.levels = response.data;
                    console.log(JSON.stringify(ctrl.levels.url[0]));
                    ctrl.displayQuestion = ctrl.levels.url.length-1;
                    ctrl.dataLoaded = true;
                }
                else{
                    Materialize.toast("Error! Check your internet Connection", 3000);
                }
            });
        }

        function incrementLevel() {
            if(ctrl.userDetails.level < 26){
                var state = 'level' + ctrl.userDetails.level;
                $state.go(state);
            }
            else{
                $state.go('completed');
            }
        }

        ctrl.submitAddOn = function () {
            ctrl.isSubmitting = true;
            var obj = {
                accessToken: ctrl.userDetails.accessToken,
                answer: ctrl.answer
            };

            ROSService.CheckAddOnAnswer(obj).then(function (response) {
                //console.log(JSON.stringify(response));
                if(response.status == 200){
                    Materialize.toast("Hurray! You got the Right Answer", 3000);
                    angular.element('#right').triggerHandler('click');
                    setTimeout(function () {
                        var keyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "esc", char : "esc", shiftKey : false, code: "Esc", keyCode: 27, which: 27, charCode: 0});
                        document.getElementById('main').dispatchEvent(keyboardEvent);
                        console.log("right");
                    }, 10000);
                    //trackUserLevel();
                    incrementLevel();
                }
                else if(response.status == 401){
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                }
                else if(response.status == 400){
                    Materialize.toast("You already Completed this level", 3000);
                }
                else {
                    /* Materialize.toast("Error! Check Your Internet Connection", 3000);*/
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                    angular.element('#wrong').triggerHandler('click');
                    setTimeout(function () {
                        var keyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "esc", char : "esc", shiftKey : false, code: "Esc", keyCode: 27, which: 27, charCode: 0});
                        document.getElementById('main').dispatchEvent(keyboardEvent);
                        console.log("wrong");
                    }, 10000);
                }
                ctrl.isSubmitting = false;
            })
        };
    }

})();