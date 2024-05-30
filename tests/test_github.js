const { Builder, By, Key, until } = require('selenium-webdriver');
require("chromedriver");
const assert = require('assert');

async function test_github() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().windowSize({width: 375, height: 812})).build();
    try {
        await driver.get('https://github.com');

        await driver.findElement(By.linkText('Sign in')).click();

        let title = await driver.getTitle();
        console.log(title);

        assert.strictEqual(title, 'Sign in to GitHub · GitHub');

        await driver.findElement(By.id('login_field')).sendKeys('wrong_username');
        await driver.findElement(By.id('password')).sendKeys('wrong_password', Key.RETURN);

        let errorMessage = await driver.wait(until.elementLocated(By.css('.flash-error')), 1000);
        assert(errorMessage);

    } finally {
        await driver.quit();
    }
}

test_github();