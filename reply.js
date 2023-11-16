const fs = require('fs').promises;
const puppeteer = require("puppeteer");
var readline = require('readline');
require('dotenv').config()

const test = async () => {
    const browser = await puppeteer.launch({
        headless:false,
        args: ['--no-sandbox'],
        userDataDir: './cache', 
        slowMo: 20,
    });

    const twPage = await browser.newPage();
    await twPage.setRequestInterception(true);
          twPage.on('request',(request)=>{
      if(request.resourceType()==='GIF') request.abort();
      else request.continue();
    })

    await twPage.setDefaultNavigationTimeout(0);
    await twPage.setRequestInterception(true);
    // Load cookie
    const cookieStr = await fs.readFile('./cookiesIG.json')
    const cookies = JSON.parse(cookieStr)
    // console.log(cookie)

    // SET COOKIES
    await twPage.setCookie(...cookies);
    // Open WEB

    const url = 'https://twitter.com/cantikk_nana/status/1724782441532203104'
    await twPage.goto(url);
    console.log('Target Terbuka')

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
     var n=3;
     for(var i=1; i<=n; i++){
        await twPage.waitFor((Math.floor(Math.random() * 5) + 6) * 1000)
        console.log('menulis komentar...')
              c = process.env.number
              let counter = parseInt(c)
              counter += i
              b = counter
              fs.writeFile(".env", "number="+b, {
                encoding: "utf8", 
                flag: "w"});
   
    await twPage.click('div[data-testid="reply"]')
    //await delay(5000);
    await twPage.waitForSelector('input', {
        visible: true
    })
    await twPage.type('[data-testid="tweetTextarea_0"]', 'pagi \nyahh \n~'+b)
    await twPage.click('div[data-testid="tweetButton"]')
    console.log('Komentar Berhasil Dikirim...!')
    }
    console.log('Selesai..')
    await browser.close();
}
test();
