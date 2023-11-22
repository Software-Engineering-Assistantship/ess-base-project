import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

// Scenario: Has Title
Given('I am at the playwright website', async function (this: ICustomWorld) {
    await this.page!.goto('https://playwright.dev/');
});

When('I open the page', async function (this: ICustomWorld) {
    // This step is already covered by the 'Given' step above
});

Then('the title has the text "Playwright"', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveTitle(/Playwright/);
});

// Scenario: Get Started Link

When('I click at "Get Started"', async function (this: ICustomWorld) {
    await this.page!.click('text=Get started');
});

Then('the URL has the text "intro"', async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL(/.*asdsd/);
});