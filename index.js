const PriceFinder = require('price-finder');
const priceFinder = new PriceFinder();
 
// Atoms for Peace : Amok  (from Amazon)
const uri = 'https://www.amazon.it/gp/product/8834603001/ref=ox_sc_act_title_1?smid=A11IL2PNWYJU7H&psc=1';
priceFinder.findItemDetails(uri, function(err, itemDetails) {
    console.log(itemDetails.price);    // 0.99
    console.log(itemDetails.name);     // Plants vs. Zombies™
    console.log(itemDetails.category); // Mobile Apps
});