// Check availability for some ps5 amazon product accessories
// by Marco Dalprato 2020

const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const path = './availability.txt'

const addTofile = false; // write to txt file status
const sendEmail = false; // send email if available

const pollingInterval = 2000;  // 60000 ms == 1 min

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nTqServer@gmail.com',
    pass: 'nvrraarnqqvwmsvk'
  }
});


const array = ["http://www.amazon.it/dp/B08H97WTBL", "http://www.amazon.it/dp/B08H99878P", "http://www.amazon.it/dp/B08H96W864","http://www.amazon.it/dp/B08H9724CC"];


function mainLoop(){

  console.log("--INIT FUNCTION ---");

   //This loop will wait for each next() to pass the next iteration
   for (var i = 0; i < array.length; i++) { 
    await new checkPrice(next=> {
        someAsyncTask(array[i], function(err, data){
            /*.... code here and when you finish...*/
            console.log("here");
            next()
        })
    })        
}

  /*
  array.forEach(function (amzn_url, index) {
    //console.log(item, index);

   // checkPrice(amzn_url) // controllo
    console.log("controllo prodotto " + index + amzn_url);
    
    setTimeout(mainLoop, pollingInterval);   // 60000 ms == 1 min

  });
  */

  console.log("--END FUNCTION ---");



}





function checkPrice(amzn_url) {

    got(amzn_url).then(response => {

      console.log(amzn_url);
        var $ = cheerio.load(response.body);

        //console.log(response.body);
        //productTitle

        var productTitle = $('#productTitle').text();

        productTitle = productTitle.replace(/(\r\n|\n|\r)/gm, "");

        var availability = $('#availability').text();
        var isAvailable = !availability.includes("Non disponibile.");
        var datetime = new Date();
        
        var text =  datetime + " - product '" + productTitle + "' is";

        if(isAvailable == true){

            var text = text + " available !"

            if(sendEmail){

              var mailOptions = {
                from: 'arteco.developers@gmail.com',
                to: 'marcodalprato@me.com',
                subject: productTitle,
                text: text + " link = "+ amzn_url
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              console.log("Exiting .... go and buy that product now !");

              return;

          }


        }else{

          var text = text + " still not available !"

        }
        
        if(addTofile){

          fs.appendFile(path, text, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });

        }

        console.log(text);



    }).catch(err => {

    console.log(err);

    });
}

mainLoop(); // chiamo funzione principale
