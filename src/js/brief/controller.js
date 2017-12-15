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

                        ctrl.tDates = data.funds;

                        var array = [];
                        for (var key in ctrl.tDates) {
                            debugger;
                            if (ctrl.tDates.hasOwnProperty(key)) {
                                array.push({data: ctrl.tDates[key].factors});
                                console.log(ctrl.tDates[key]);
                            }

                        // console.log(key);
                        }
                        console.log(array);

                       // var values = {};
                       //
                       //  var log = [];
                       //  angular.forEach(ctrl.tDates, function (value, key) {
                       //      this.push(key + ': ' + value);
                       //  }, log);
                       //  console.log(log);
                    }
                });
        }

        parseData();

    }

    var brief = angular
        .module('app.brief');
    brief.controller('briefController', BriefController);
})();
