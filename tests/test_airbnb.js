const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function test_airbnb() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.airbnb.fr');

        try {
            let acceptCookiesButton = await driver.findElement(By.css('button[data-testid="accept-btn"]'));
            await acceptCookiesButton.click();
        } catch (e) {
            console.log("Pas de bouton de cookies trouvé");
        }

        let searchBox = await driver.wait(until.elementLocated(By.css('input[placeholder="Rechercher une destination"]')), 10000);
        await driver.wait(until.elementIsVisible(searchBox), 10000);

        await searchBox.sendKeys('Paris', Key.RETURN);

        let dateField = await driver.wait(until.elementLocated(By.css('div[data-testid="structured-search-input-field-split-dates-0"]')), 10000);
        await driver.wait(until.elementIsVisible(dateField), 10000);
        await dateField.click();

        let startDate = await driver.findElement(By.css('td[data-testid="datepicker-day-2024-06-17"]'));
        await driver.wait(until.elementIsVisible(startDate), 10000);
        await startDate.click();

        let endDate = await driver.findElement(By.css('td[data-testid="datepicker-day-2024-06-23"]'));
        await driver.wait(until.elementIsVisible(endDate), 10000);
        await endDate.click();

        let searchButton = await driver.findElement(By.css('button[data-testid="structured-search-input-search-button"]'));
        await driver.wait(until.elementIsVisible(searchButton), 10000);
        await searchButton.click();

        let guestsButton = await driver.wait(until.elementLocated(By.css('div[data-testid="structured-search-input-field-guests-button"]')), 10000);
        await driver.wait(until.elementIsVisible(guestsButton), 10000);
        await guestsButton.click();

        let increaseAdultsButton = await driver.findElement(By.css('button[data-testid="stepper-adults-increase-button"]'));
        await driver.wait(until.elementIsVisible(increaseAdultsButton), 10000);
        await increaseAdultsButton.click();
        await increaseAdultsButton.click();

        let finalSearchButton = await driver.findElement(By.css('button[data-testid="structured-search-input-search-button"]'));
        await driver.wait(until.elementIsVisible(finalSearchButton), 10000);
        await finalSearchButton.click();

        await driver.wait(until.elementLocated(By.css('div[data-testid="explore-tab"]')), 10000);

        console.log("Recherche Airbnb réussie");

    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
}

test_airbnb();