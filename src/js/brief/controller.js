(function () {
    'use strict';

    function BriefController() {
        var rate = 'rate works';
        console.log(rate);

        function parseData() {
            var getJSON = function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    var status = xhr.status;
                    if (status === 200) {
                        callback(null, xhr.response);
                    } else {
                        callback(status, xhr.response);
                    }
                };
                xhr.send();
            };

            getJSON('https://nodes.gvo.io/v1/ticker/GVOUSD',
                function (err, data) {
                    if (err !== null) {
                        console.log('Error');
                    } else {
                        document.getElementById('symbol').innerHTML = data.symbol;
                        document.getElementById('price_usd').innerHTML = data.price_usd;
                        document.getElementById('price_btc').innerHTML = data.price_btc;
                        console.log('is working');
                    }
                });
        }

        parseData();
    }

    // CommunityController.$inject = ['$scope', '$interval', 'apiService', 'applicationContext'];

    var brief = angular
        .module('app.brief');
    brief.controller('briefController', BriefController);
})();
