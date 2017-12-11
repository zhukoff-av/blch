(function () {
    'use strict';

    function BriefController() {
        var ctrl = this;
        ctrl.factorsNames = [];

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
                        ctrl.symbol = data.symbol;
                        ctrl.price_usd = data.price_usd;
                        ctrl.price_btc = data.price_btc;
                    }
                });

            getJSON('https://nodes.gvo.io/v1/briefs/last',
                function (err, data) {
                    if (err !== null) {
                        console.log('Error');
                    } else {
                        // Crude Oil
                        ctrl.factorsNamesCo = data.funds.crude_oil.factors;
                        ctrl.messageCo = data.funds.crude_oil.message;
                        ctrl.openPriceCo = data.funds.crude_oil.open_price;
                        ctrl.updatePriceCo = data.funds.crude_oil.update_price;
                        ctrl.openDateCo = data.funds.crude_oil.open_date;
                        ctrl.plForNowCo = data.funds.crude_oil['p&l_for_now:'];


                        // Gold
                        ctrl.factorsNamesG = data.funds.gold.factors;
                        ctrl.messageG = data.funds.gold.message;
                        ctrl.openPriceG = data.funds.gold.open_price;
                        ctrl.updatePriceG = data.funds.gold.update_price;
                        ctrl.openDateG = data.funds.gold.open_date;
                        ctrl.plForNowG = data.funds.gold['p&l_for_now:'];

                        //console.log(ctrl.plForNow);
                    }
                });
        }

        parseData();

        // TODO Mock GVO remove

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

        // TODO Mock Gold remove

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

        // TODO Mock Retro remove
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
