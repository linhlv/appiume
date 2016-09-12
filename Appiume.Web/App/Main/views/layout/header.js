﻿(function () {
    var controllerId = 'app.views.layout.header';
    angular.module('app').controller(controllerId, [
        '$rootScope', '$state', 'appSession',
        function ($rootScope, $state, appSession) {
            var vm = this;

            vm.languages = apm.localization.languages;
            vm.currentLanguage = apm.localization.currentLanguage;

            vm.menu = apm.nav.menus.MainMenu;
            vm.currentMenuName = $state.current.menu;

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                vm.currentMenuName = toState.menu;
            });

            vm.getShownUserName = function () {
                if (!apm.multiTenancy.isEnabled) {
                    return appSession.user.userName;
                } else {
                    if (appSession.tenant) {
                        return appSession.tenant.tenancyName + '\\' + appSession.user.userName;
                    } else {
                        return '.\\' + appSession.user.userName;
                    }
                }
            };



            // Top Search
            vm.openSearch = function () {
                angular.element('#header').addClass('search-toggled');
                angular.element('#top-search-wrap').find('input').focus();
            }

            vm.closeSearch = function () {
                angular.element('#header').removeClass('search-toggled');
            }

            // Get messages and notification for header
            vm.img = messageService.img;
            vm.user = messageService.user;
            vm.user = messageService.text;

            vm.messageResult = messageService.getMessage(this.img, this.user, this.text);


            //Clear Notification
            vm.clearNotification = function ($event) {
                $event.preventDefault();

                var x = angular.element($event.target).closest('.listview');
                var y = x.find('.lv-item');
                var z = y.size();

                angular.element($event.target).parent().fadeOut();

                x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
                x.find('.grid-loading').fadeIn(1500);
                var w = 0;

                y.each(function() {
                    var z = $(this);
                    $timeout(function() {
                        z.addClass('animated fadeOutRightBig').delay(1000).queue(function() {
                            z.remove();
                        });
                    }, w += 150);
                });

                $timeout(function () {
                    angular.element('#notifications').addClass('empty');
                }, (z * 150) + 200);
            }

            // Clear Local Storage
            vm.clearLocalStorage = function () {

                //Get confirmation, if confirmed clear the localStorage
                swal({
                    title: "Are you sure?",
                    text: "All your saved localStorage values will be removed",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#F44336",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function () {
                    localStorage.clear();
                    swal("Done!", "localStorage is cleared", "success");
                });

            }

            //Fullscreen View
            vm.fullScreen = function () {
                //Launch
                function launchIntoFullscreen(element) {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }

                //Exit
                function exitFullscreen() {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }

                if (exitFullscreen()) {
                    launchIntoFullscreen(document.documentElement);
                }
                else {
                    launchIntoFullscreen(document.documentElement);
                }
            }
        }
    ]);
})();