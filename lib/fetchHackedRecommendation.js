const puppeteer = require('puppeteer');

module.exports = async () => {
  const loginURL = 'https://hacked.com/wp-login.php';
  const recommendationURL = 'https://hacked.com/recommendations2/';

  const loginInputField = 'input#user_login';
  const passwordInputField = 'input#user_pass';
  const submitButton = 'input[type="submit"]';
  const loginId = process.env.HACKED_USERNAME;
  const password = process.env.HACKED_PASSWORD;

  // launch a headless browser
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  // start a new page
  const page = await browser.newPage();
  // navigate to Hacked.com login page
  await page.goto(loginURL);

  // once page is loaded
  // focus on username field
  await page.focus(loginInputField);
  // and type the username
  await page.type(loginId);
  // same for password
  // focus on password field
  await page.focus(passwordInputField);
  // and type the password
  await page.type(password);
  // finally to finish logging in click submit button
  await page.click(submitButton);

  // and wait for login request to finish
  await page.waitForNavigation({ waitUntil: 'load' });

  // and next navigate to recoomendation page
  await page.goto(recommendationURL);
  // gather all the neccesary information from the reccomendation table
  const hackedReccomendationData = await page.evaluate(() => {
    const reccomendationTableData = [...document.querySelectorAll('table.tablepress tbody tr')];
    return reccomendationTableData.map(dataRow => ({
      date: dataRow.querySelector('.column-1').innerHTML,
      asset: dataRow.querySelector('.column-2 a').innerHTML,
      link: dataRow.querySelector('.column-2 a').href,
      recommendation: dataRow.querySelector('.column-3').innerHTML,
      entryPrice: dataRow.querySelector('.column-4').innerHTML,
      stopLoss: dataRow.querySelector('.column-5').innerHTML,
      target: dataRow.querySelector('.column-6').innerHTML,
      status: dataRow.querySelector('.column-7').innerHTML,
    }));
  });
  // finally close the browser
  browser.close();
  // and return the gathered information
  return hackedReccomendationData;
};
