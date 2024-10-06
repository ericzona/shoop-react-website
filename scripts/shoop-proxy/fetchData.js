// proxy-server.js
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000; // or your preferred port

app.get('/fetch-holders', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Referer': 'https://solscan.io',
      'Accept-Language': 'en-US,en;q=0.9',
    });

    await page.goto('https://api.solscan.io/token/holders?tokenAddress=3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump&limit=10', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => document.body.innerText); // Adjust extraction logic if necessary
    await browser.close();

    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching data: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
