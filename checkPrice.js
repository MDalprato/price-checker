const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const cheerio = require('cheerio');


var amzn_url = 'http://www.amazon.it/dp/B086YG88DQ';

checkPrice()

function checkPrice() {

    got(amzn_url).then(response => {

        var $ = cheerio.load(response.body);

        var list_price = $('#priceblock_saleprice').text();
        // var stripped_price = list_price.replace('€', '').replace(',', '');   // remove leading $ and any commas

        console.log(list_price);


        setTimeout(checkPrice, 10000);   // 60000 ms == 1 min

    }).catch(err => {

    console.log(err);

    });
}