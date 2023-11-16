const puppeteer = require('puppeteer');
const fs = require('fs');

async function main(){
 const browser = await puppeteer.launch({headless:false});
 const page = await browser.newPage();
 const kuki = 'cookiesIG.json';
 const ceksesi = fs.existsSync(kuki);
      if(ceksesi){
        const bacakuki = fs.readFileSync(kuki);
        const parsekuki = JSON.parse(bacakuki);
        if(bacakuki.length !== 0){
            for(cookie of parsekuki){
                await page.setCookie(cookie);
            }
            console.log("Berhasil membaca cookie")
        }

       
    }else{
        console.log("cookie enggak ada");
    }
      // desable gambar.
      await page.setRequestInterception(true);
      page.on('request',(request)=>{
        if(request.resourceType()==='image') request.abort();
        else request.continue();
      })
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://twitter.com/i/flow/login');
      await page.waitForSelector('input', {
        visible: true
    })
    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
    await page.type('[autocomplete="username"]', 'username')
    await page.click('div[role="button"]:nth-of-type(6)')
    console.log('Sebentar....')
    await delay(15000);
    await page.waitForSelector('input', {
        visible: true
    })
    await page.type('[autocapitalize="sentences"][autocomplete="current-password"]', 'password')
    await delay(15000);
    await page.click('div[data-testid="LoginForm_Login_Button"]')
    await delay(15000);
    console.log('Selesai.....')
    
    const cookieOB = await page.cookies();
    fs.writeFile(kuki, JSON.stringify(cookieOB),function(err){
             if(err){
                console.log("Gagal Membuat Cookie");
             } else{
                console.log("Cookie Berhasil Dibuat");
             }
    })
      await browser.close();
}
main();
