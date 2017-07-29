(function(){
    'use strict';
    angular
        .module('ros')
        .controller('MainController', MainController);
    MainController.$inject = ['$state', '$scope', '$interval', 'ROSService', '$cookieStore', '$window', '$route', '$rootScope', '$location'];
    function MainController($state, $scope, interval, ROSService, $cookieStore, $window, $route, $rootScope, $location){
        var ctrl = this;
        var randomNumber = Math.floor((Math.random() * 4)+1);
        var w = '../images/popup/wrong' + randomNumber + '.jpg';
        $cookieStore.put('wrong', w);
        ctrl.wrong = $cookieStore.get('wrong');
        //ctrl.wrong = "../images/wrong.png";
        //ctrl.randomNumber = 0;
        ctrl.popupImage = ['../images/popup/wrong1.jpg', '../images/popup/wrong2.jpg', '../images/popup/wrong3.jpg', '../images/popup/wrong4.jpg']
        ctrl.loggedIn = false;
        ctrl.dataLoaded = false;
        ctrl.isSubmitting = false;
        ctrl.currentState = $rootScope.current;
        ctrl.showAd = false;
        
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
                console.log(ctrl.userDetails);
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
                accessToken: ctrl.userDetails.accessToken
            };

           // console.log(ctrl.currentState.substring(5, ctrl.currentState.length));
            if((ctrl.userDetails.level == 20 && ctrl.currentState != 'level20') || (ctrl.userDetails.level == 10 && ctrl.currentState != 'level10') || (ctrl.userDetails.level == 25 && ctrl.currentState != 'level25')){
                obj.level = ctrl.currentState.substring(5, ctrl.currentState.length);
                ROSService.GetPreviousLevelAccess(obj).then(function (response) {
                    if(response.status == 200){
                        ctrl.levels = response.data;
                        console.log(JSON.stringify(ctrl.levels.url[0]));
                        ctrl.displayQuestion = ctrl.levels.url.length-1;
                        ctrl.dataLoaded = true;
                    }
                    else{
                        Materialize.toast("Error! Check your internet Connection", 3000);
                    }
                })
            }
            else if(ctrl.userDetails.level != 25) {
                ROSService.TrackUser(obj).then(function(response){
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
        }

        function incrementLevel() {
            $cookieStore.put('shared', 'false');
            if(ctrl.userDetails.level < 26){
                var state = 'level' + ctrl.userDetails.level;
                $state.go(state);
            }
            else{
                $state.go('completed');
            }
        }

        ctrl.submit = function () {
            ctrl.isSubmitting = true;
            var obj = {
                accessToken: ctrl.userDetails.accessToken,
                answer: ctrl.answer
            };


            ctrl.randomNumber = parseInt(Math.round((Math.random() * 4)));
            console.log(ctrl.randomNumber);
            ctrl.wrong = "../images/popup/wrong" + ctrl.randomNumber.toString() + ".jpg";
            console.log(ctrl.wrong);
            ROSService.CheckAnswer(obj).then(function (response) {
                if(response.status == 200){
                    Materialize.toast("Hurray! You got the Right Answer", 3000);
                    /*angular.element('#right').triggerHandler('click');
                    setTimeout(function () {
                        var keyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "esc", char : "esc", shiftKey : false, code: "Esc", keyCode: 27, which: 27, charCode: 0});
                        document.getElementById('main').dispatchEvent(keyboardEvent);
                        console.log("right");
                    }, 10000);*/
                    //trackUserLevel();
                    if(ctrl.userDetails.level == 0){
                        ctrl.userDetails.isLifelineAvailable = true;
                    }
                    ctrl.userDetails.level += 1;
                    $cookieStore.put('userDetails', ctrl.userDetails);
                    incrementLevel();
                }
                else if(response.status == 401){
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                    angular.element('#wrong').triggerHandler('click');
                }
                else if(response.status == 400){
                    Materialize.toast("You already Completed this level", 3000);
                }
                else {
                   /* Materialize.toast("Error! Check Your Internet Connection", 3000);*/
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                    angular.element('#wrong').triggerHandler('click');

                }
                ctrl.isSubmitting = false;
            })
        };

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
                    /*angular.element('#right').triggerHandler('click');
                    setTimeout(function () {
                        var keyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "esc", char : "esc", shiftKey : false, code: "Esc", keyCode: 27, which: 27, charCode: 0});
                        document.getElementById('main').dispatchEvent(keyboardEvent);
                        console.log("right");
                    }, 10000);*/
                    //trackUserLevel();
                    incrementLevel();
                }
                else if(response.status == 401){
                    Materialize.toast("Oops! Incorrect Answer", 3000);
                    angular.element('#wrong').triggerHandler('click');
                    setTimeout(function () {
                        var keyboardEvent = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "esc", char : "esc", shiftKey : false, code: "Esc", keyCode: 27, which: 27, charCode: 0});
                        document.getElementById('main').dispatchEvent(keyboardEvent);
                        console.log("wrong");
                    }, 10000);
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

        ctrl.skipLevel = function(){
            ctrl.isSubmitting = true;
            var obj = {
                accessToken: ctrl.userDetails.accessToken
            };

            ROSService.GetLifeLine(obj).then(function (response) {
                console.log(JSON.stringify(response));
                if(response.status == 200){
                    Materialize.toast("Level Successfully skipped", 3000);
                    ctrl.userDetails.level += 1;
                    ctrl.userDetails.isLifelineAvailable = false;
                    $cookieStore.put('userDetails', ctrl.userDetails);
                    incrementLevel();
                }
                else{
                    Materialize.toast("You hav Already used your LifeLine", 3000);
                }
                ctrl.isSubmitting = false;
            })
        };
        
        /*ctrl.seek = function(operation){
            if(operation == 1){
                if(ctrl.displayQuestion < ctrl.levels.url.length-1){
                    ctrl.displayQuestion += 1;
                }
            }
            else if(operation == 0){
                if(ctrl.displayQuestion > 0){
                    ctrl.displayQuestion -= 1;
                }
            }
        };*/

    }

})();