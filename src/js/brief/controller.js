(function () {
    'use strict';

    function BriefController() {
        var ctrl = this;
        var rate = 'rate works';
        ctrl.factorsNames = [];
        var message = [];
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
                      //  console.log('Rate is working');
                    }
                });

            getJSON('https://nodes.gvo.io/v1/briefs/last',
                function (err, data) {
                    if (err !== null) {
                        console.log('Error');
                    } else {

                        ctrl.factorsNames = data.funds.crude_oil.factors;
                        ctrl.message = data.funds.crude_oil.message;
                        console.log(message[0]);
                    }
                });
        }

        parseData();

        ctrl.globalViewBrant = [
            {
                name: 'OPEC',
                sec: 3,
                act: 'buy'

            },
            {
                name: 'Saudi',
                sec: 3,
                act: 'buy'

            }
        ];

        ctrl.globalViewGold = [
            {
                name: 'Tax',
                sec: 1,
                act: 'buy'

            },
            {
                name: 'Saudi',
                sec: 3,
                act: 'buy'

            }
        ];

        ctrl.retro = [
            {
                name: 'Open price',
                price: 1002,
            },
            {
                name: 'Updated price',
                price: 2002,
            },
            {
                name: 'P&L for now',
                price: 8.50,
            },

        ];
    }

    var brief = angular
        .module('app.brief');
    brief.controller('briefController', BriefController);
})();
