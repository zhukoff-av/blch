(function () {
    'use strict';

    angular
        .module('app.navigation')
        .controller('navigationController', ['$scope', function ($scope) {
            var nav = this;

            nav.currentTab = 'brief';
            nav.changeTab = changeTab;

            function changeTab (pageId) {
                nav.currentTab = pageId;
            }
        }]);
})();
