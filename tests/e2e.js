// 自动化测试
// ***运行自动化测试前请先下载并安装firefox浏览器！！！***
// ***运行自动化测试前请先下载并安装firefox浏览器！！！***
// ***运行自动化测试前请先下载并安装firefox浏览器！！！***
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example () {
  let driver = await new Builder().forBrowser('firefox').build()
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit()
  }
})()
