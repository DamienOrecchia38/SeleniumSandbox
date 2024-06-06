const { Builder, By, until} = require('selenium-webdriver');
const path = require('path');
const { log } = require('console');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testSimplonline() {

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    let driver = await new Builder().forBrowser('chrome').build();
    let simplonlineAcceptCookies = await driver.wait(until.elementLocated(By.css('.sc-3243846d-0.eZuIYT')), 5000);
    let renderNavbarElement = await driver.wait(until.elementLocated(By.xpath(`//*[@href="/workspaces"]`)), 5000);
    let sortButton = await driver.wait(until.elementLocated(By.css('button[title="Briefs - Tri ascendant actif"]')), 5000);
    let seleniumSandboxElement = await driver.wait(until.elementLocated(By.xpath('//li[contains(@class, "sc-2781a8cc-0")]//h2[text()="Selenium Sandbox"]')), 5000);
    let submitButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(.,"Soumettre un rendu")]')), 5000);
    let urlInput = await driver.findElement(By.css(".sc-12218616-0.eneWwx"));
    let addUrl = await driver.findElement(By.xpath('//*[@id="tabpanel-0"]/div/div/button'));
    let addMessage = await driver.findElement(By.xpath('//*[@id="message"]'));
    let sendSubmit = await driver.findElement(By.xpath('//*[@id="__next"]/div[3]/div/div/div/div[2]/div/form/div[3]/button[2]'));

    try {
        console.log('Ouverture navigateur...');
        await driver.get('https://simplonline.co/login');

        console.log('Acceptation des cookies...');
        if (simplonlineAcceptCookies) {
            await simplonlineAcceptCookies.click();
            console.log('Cookie acceptés !');
        } else {
            console.log('Lien pas trouvé !');
        }

        // console.log('Test de connexion avec identifiants incorrects...');
        // await driver.findElement(By.name('email')).sendKeys('wrong_email@gmail.com');
        // await driver.findElement(By.name('password')).sendKeys('wrong_password');
        // await driver.findElement(By.css('button[type="submit"]')).click();

        console.log('Test de connexion avec identifiants corrects...');
        if (!email || !password) {
            console.log('Les variables d\'environnement EMAIL et PASSWORD ne sont pas définies');
        }

        await driver.findElement(By.name('email')).sendKeys(email);
        await driver.findElement(By.name('password')).sendKeys(password);
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('Test login correct: réussi');

        if (renderNavbarElement) {
            await renderNavbarElement.click();
            await driver.sleep(5000);
            console.log('Rendu cliqué !');
        } else {
            console.log('Bouton non trouvé !');
        }

        if (sortButton) {
            await sortButton.click();
            await driver.sleep(5000);
            console.log('Tri cliqué !');
        } else {
            console.log('Bouton non trouvé !');
        }

        if (seleniumSandboxElement) {
            await seleniumSandboxElement.click();
            await driver.sleep(5000);
            console.log('Selenium Sandbox cliqué !');
        } else {
            console.log('Bouton non trouvé !');
        }

        if (submitButton) {
            await submitButton.click();
            await driver.sleep(5000);
            console.log('Soumettre un rendu cliqué !');
        } else {
            console.log('Bouton non trouvé !');
        }

        if (urlInput) {
            await driver.sleep(5000);
            await urlInput.sendKeys('https://github.com/DamienOrecchia38/SeleniumSandbox.git');
            console.log('URL entrée !');
        } else {
            console.log('Champ d\'entrée non trouvé !');
        }

        if (addUrl) {
            await driver.sleep(5000);
            await addUrl.click();
            console.log('Ajouter URL cliqué !');
        } else {
            console.log('Bouton non trouvé !');
        }

        if (addMessage) {
            await driver.sleep(5000);
            await urlInput.sendKeys('oui');
            console.log('Message entré !');
        } else {
            console.log('Champ d\'entrée non trouvé !');
        }

        if (sendSubmit) {
            await driver.sleep(5000);
            await sendSubmit.click();
            console.log('Envoyer cliqué !');
        } else {
            console.log('Champ d\'entrée non trouvé !');
        }

    } finally {
        await driver.quit();
    }
}

testSimplonline();
