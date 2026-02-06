import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// Define metadata type for TypeScript
type ProjectMetadata = {
    appUsername: string;
    appPassword: string;
};

type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page, baseURL }, use, testInfo) => {
        
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);

        // Type-safe metadata access
        const metadata = testInfo.project.metadata as ProjectMetadata;
        const username = metadata.appUsername;
        const password = metadata.appPassword;

        const homePage = await loginPage.doLogin(username, password);
        await page.waitForTimeout(3000);
        expect(await homePage.isUserLoggedIn()).toBeTruthy();
        
        await use(homePage);
    }
});

export { expect };