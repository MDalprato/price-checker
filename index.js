const scrapeIt = require('scrape-it')

// B06Y42MJ4N
// scrape Amazon by asin (product id)
const scrapeAmazon = (asin) => {
  const url = `https://amazon.it/dp/${asin}`
  console.log('Scraping URL', url);
  return scrapeIt(url, {
    price: {
      selector: '#corePrice_feature_div .a-offscreen',
      // convert: p => Math.round(parseInt(p.split('€')[1])) * 100
    }
  })

}

const scrape = async () => {

  const scraped = await scrapeAmazon("B00OTG9KGG")
  if (scraped.response.statusCode === 200 && scraped.data.price) {

    console.log(scraped.data.price)
  } else {
    console.log('Out of stock')
  }


}

scrape();