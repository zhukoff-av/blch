(function () {
    'use strict';

    function BriefController() {
        var ctrl = this;
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

        ctrl.wallets = [
            {
                balance: new Money(0, Currency.USD),
                depositWith: Currency.USD
            },
            {
                balance: new Money(0, Currency.EUR),
                depositWith: Currency.EUR
            },
            {
                balance: new Money(0, Currency.BTC),
                depositWith: Currency.BTC
            },
            {
                balance: new Money(0, Currency.WAVES),
                depositWith: Currency.BTC
            },
            {
                balance: new Money(0, Currency.ETH),
                depositWith: Currency.ETH
            },
            {
                balance: new Money(0, Currency.LTC),
                depositWith: Currency.LTC
            },
            {
                balance: new Money(0, Currency.ZEC),
                depositWith: Currency.ZEC
            }
        ];

        ctrl.participantList = [
            {
                place: 1,
                price: '$' + 10,
                capital: '$' + 1000
            },
            {
                place: 2,
                price: '$' + 19,
                capital: '$' + 11000
            },
            {
                place: 3,
                price: '$' + 29,
                capital: '$' + 12000
            },
            {
                place: 4,
                price: '$' + 39,
                capital: '$' + 15000
            },
            {
                place: 5,
                price: '$' + 10,
                capital: '$' + 1000
            },
            {
                place: 6,
                price: '$' + 19,
                capital: '$' + 11000
            },
            {
                place: 7,
                price: '$' + 29,
                capital: '$' + 12000
            },
            {
                place: 8,
                price: '$' + 39,
                capital: '$' + 15000
            }
        ];

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
