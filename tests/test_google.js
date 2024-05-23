const { Builder, By, Key, until } = require('selenium-webdriver');

async function test_google() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('simplonline', Key.RETURN);
        await driver.wait(until.titleIs('simplonline'), 1000);
    } finally {
        await driver.quit();
    }
}

test_google();