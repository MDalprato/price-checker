/*
MIT license, copyright by Marco Dalprato 2021.
Snipped for checking availability of a product on Amazon.
*/

const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const addTofile = false;
const sendMail = false;

var amzn_url = 'http://www.amazon.it/dp/B08H97WTBL'; // link of the pruduct that you want to check
const path = './availability.txt' // file where to save the status of the availability of the product

checkPrice('http://www.amazon.it/dp/B08H97WTBL')

function sendMail(from,to,subject,text){

    var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent, response: ' + info.response);
      }
    });

    return;

}


function checkPrice(productUrl) {
    
    got(amzn_url).then(response => {

        var $ = cheerio.load(response.body);

        var availability = $('#availability').text();
        var isAvailable = !availability.includes("Non disponibile.");
        var datetime = new Date();
        
        var text = "--"

        if(isAvailable == true){

            var text = datetime +  "Product is availbale" 


        }else{
            var text =  datetime +  "Product is not availbale" 

        }
        
        if(addTofile){

          fs.appendFile(path, text, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });

        }

        console.log(text);


        setTimeout(checkPrice, 5000);   // 60000 ms == 1 min

    }).catch(err => {

    console.log(err);

    });
}