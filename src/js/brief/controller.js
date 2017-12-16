(function () {
    'use strict';

    function BriefController() {
        var ctrl = this;
        ctrl.array = [];
        ctrl.fundNames = [];

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

                        //DowJ dow_j_mini/s&p_500
                        ctrl.factorsNamesDj = data.funds['dow_j_mini/s&p_500'].factors;
                        ctrl.messageDj = data.funds['dow_j_mini/s&p_500'].message;
                        ctrl.openPriceDj = data.funds['dow_j_mini/s&p_500'].open_price;
                        ctrl.updatePriceDj = data.funds['dow_j_mini/s&p_500'].update_price;
                        ctrl.openDateDj = data.funds['dow_j_mini/s&p_500'].open_date;
                        ctrl.plForNowDj = data.funds['dow_j_mini/s&p_500']['realized_p&l:'];

                        //EUR/USD_FX
                        ctrl.factorsNamesEU = data.funds['eur/usd_fx'].factors;
                        ctrl.messageEU = data.funds['eur/usd_fx'].message;
                        ctrl.openPriceEU = data.funds['eur/usd_fx'].open_price;
                        ctrl.updatePriceEU = data.funds['eur/usd_fx'].update_price;
                        ctrl.openDateEU = data.funds['eur/usd_fx'].open_date;
                        ctrl.plForNowEU = data.funds['eur/usd_fx']['realized_p&l:'];

                        ctrl.tDates = data.funds;

                        for (var key in ctrl.tDates) {
                            // debugger;
                            if (ctrl.tDates.hasOwnProperty(key)) {
                                ctrl.array.push({data: ctrl.tDates[key].factors});
                                // console.log(ctrl.tDates[key].id);
                                ctrl.fundNames.push({keys: key});
                            }
                        }
                    }

                });
        }

        parseData();

    }

    var brief = angular
        .module('app.brief');
    brief.controller('briefController', BriefController);
})();
