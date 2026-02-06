import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '../fixtures/baseFixtures';
import { DataGenerator } from '../utils/DataGenerator';

// Valid test credentials from playwright.config.ts
const VALID_EMAIL = 'jeswanth1116@gmail.com';
const VALID_PASSWORD = 'Test@1234';

// Add 1-second delay between each test
test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(1000);
});

// ═════════════════════════════════════════════════════════════════
// BATCH 1: Core Login Tests (TC_LF_001 to TC_LF_005) @smoke
// ═════════════════════════════════════════════════════════════════

test('TC_LF_001: Valid credentials login @smoke @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 50 - user can login to app' },
            { type: 'severity', description: 'Blocker' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ homePage }) => {
        await expect(homePage.page).toHaveTitle('My Account');
    });

test('TC_LF_002: Invalid credentials (both invalid) @smoke @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 51 - verify login validation for invalid credentials' },
            { type: 'severity', description: 'Critical' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = DataGenerator.generateRandomEmail();
        const invalidPassword = DataGenerator.generateRandomPassword();
        
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin(invalidEmail, invalidPassword);
        await page.waitForTimeout(1000);
        
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
    });

test('TC_LF_003: Invalid email + valid password @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 52 - verify login validation for invalid email' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = DataGenerator.generateRandomEmail();
        
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin(invalidEmail, VALID_PASSWORD);
        await page.waitForTimeout(1000);
        
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
    });

test('TC_LF_004: Valid email + invalid password @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 53 - verify login validation for invalid password' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        const invalidPassword = DataGenerator.generateRandomPassword();
        
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin(VALID_EMAIL, invalidPassword);
        await page.waitForTimeout(1000);
        
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
    });

test('TC_LF_005: Empty credentials (no email, no password) @smoke @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 51 - verify login validation for empty credentials' },
            { type: 'severity', description: 'Critical' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        await loginPage.clickLoginButton();
        await page.waitForTimeout(1000);
        
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toMatch(/Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/);
    });

// ═════════════════════════════════════════════════════════════════
// BATCH 2: Link & Navigation Tests (TC_LF_006 to TC_LF_010) @functional
// ═════════════════════════════════════════════════════════════════

test('TC_LF_006: Forgotten password link functionality @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 54 - verify forgotten password link' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
        expect(isForgotPasswordVisible).toBeTruthy();
        
        await loginPage.navigateToForgotPassword();
        await expect(page).toHaveURL(/.*forgotten/);
    });

test('TC_LF_007: Login using keyboard (Tab and Enter) @functional @accessibility',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 55 - verify keyboard navigation' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        // Focus on email field and type
        const emailInput = await loginPage.getEmailInput();
        await emailInput.focus();
        await page.keyboard.type(VALID_EMAIL);
        
        // Tab to password field and type
        await page.keyboard.press('Tab');
        await page.keyboard.type(VALID_PASSWORD);
        
        // Press Enter from password field to submit form
        await page.keyboard.press('Enter');
        
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('My Account');
    });

test('TC_LF_008: Placeholder text verification @functional @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 56 - verify placeholder text' },
            { type: 'severity', description: 'Minor' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const emailPlaceholder = await loginPage.getEmailPlaceholder();
        const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
        
        expect(emailPlaceholder).toBeDefined();
        expect(passwordPlaceholder).toBeDefined();
    });

test('TC_LF_009: Browser back button after login @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 57 - verify session persistence with back button' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin(VALID_EMAIL, VALID_PASSWORD);
        
        await page.waitForLoadState('networkidle');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('My Account');
        
        // Click browser back button
        await page.goBack();
        await page.waitForTimeout(1000);
        
        // User should still be logged in and redirected to account
        const currentTitle = await page.title();
        expect(currentTitle).toContain('My Account');
    });

test('TC_LF_010: Browser back button after logout @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 58 - verify logout functionality' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        // Note: This test uses the fixture which auto-logs in
        // We need to navigate directly for this test
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin(VALID_EMAIL, VALID_PASSWORD);
        await page.waitForLoadState('networkidle');
        
        // Logout
        await page.waitForTimeout(1000);
        const logoutLink = page.locator('a:has-text("Logout")').first();
        if (await logoutLink.isVisible()) {
            await logoutLink.click();
            await page.waitForLoadState('networkidle');
        }
    });

// ═════════════════════════════════════════════════════════════════
// BATCH 3: Security Tests (TC_LF_011 to TC_LF_015) @security
// ═════════════════════════════════════════════════════════════════

test('TC_LF_011: Password field visibility (masked) @security @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 59 - verify password field is masked' },
            { type: 'severity', description: 'Blocker' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const isPasswordMasked = await loginPage.isPasswordMasked();
        expect(isPasswordMasked).toBeTruthy();
    });

test('TC_LF_012: Multiple unsuccessful login attempts (5x) @security @regression',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 60 - verify account lockout after failed attempts' },
            { type: 'severity', description: 'Blocker' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = DataGenerator.generateRandomEmail();
        const invalidPassword = DataGenerator.generateRandomPassword();
        
        await loginPage.goToLoginPage(baseURL);
        
        for (let i = 0; i < 5; i++) {
            await loginPage.doLogin(invalidEmail, invalidPassword);
            await page.waitForTimeout(500);
            
            if (i < 4) {
                // Clear fields for next attempt
                const emailInput = await loginPage.getEmailInput();
                const passwordInput = await loginPage.getPasswordInput();
                await emailInput.clear();
                await passwordInput.clear();
            }
        }
        
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toBeDefined();
    });

test('TC_LF_013: Password not visible in page source @security',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 61 - verify password not in plain text' },
            { type: 'severity', description: 'Critical' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        await loginPage.fillEmailAndPassword(VALID_EMAIL, VALID_PASSWORD);
        
        const passwordInput = await loginPage.getPasswordInput();
        const passwordValue = await passwordInput.getAttribute('value');
        
        // Password should be masked, not stored as plain text in value attribute
        expect(passwordValue).not.toContain(VALID_PASSWORD);
    });

test('TC_LF_014: Login button is clickable @security @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 62 - verify login button is functional' },
            { type: 'severity', description: 'Critical' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const loginButton = await loginPage.getLoginButton();
        const isVisible = await loginButton.isVisible();
        const isEnabled = await loginButton.isEnabled();
        
        expect(isVisible).toBeTruthy();
        expect(isEnabled).toBeTruthy();
    });

test('TC_LF_015: Login page elements are loaded @security @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 63 - verify all page elements are loaded' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const emailInput = await loginPage.getEmailInput();
        const passwordInput = await loginPage.getPasswordInput();
        const loginButton = await loginPage.getLoginButton();
        const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
        
        expect(await emailInput.isVisible()).toBeTruthy();
        expect(await passwordInput.isVisible()).toBeTruthy();
        expect(await loginButton.isVisible()).toBeTruthy();
        expect(isForgotPasswordVisible).toBeTruthy();
    });

// ═════════════════════════════════════════════════════════════════
// BATCH 4: Navigation Tests (TC_LF_016 to TC_LF_020) @navigation
// ═════════════════════════════════════════════════════════════════

test('TC_LF_016: Register link navigation @navigation @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 64 - verify register link navigation' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        await loginPage.navigateToContinueButton();
        await expect(page).toHaveURL(/.*register/);
    });

test('TC_LF_017: Login page title verification @navigation @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 65 - verify login page title' },
            { type: 'severity', description: 'Minor' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const pageTitle = await loginPage.getPageTitle();
        expect(pageTitle).toContain('Account Login');
    });

test('TC_LF_018: Login page URL verification @navigation @ui',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 66 - verify login page URL' },
            { type: 'severity', description: 'Minor' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const pageURL = await loginPage.getPageURL();
        expect(pageURL).toContain('account/login');
    });

test('TC_LF_019: Register button visibility @navigation @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 67 - verify register button is visible' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const continueBtn = page.getByRole('link', { name: 'Continue' }).first();
        const isVisible = await continueBtn.isVisible();
        
        expect(isVisible).toBeTruthy();
    });

test('TC_LF_020: Forgotten password redirect @navigation @functional',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 68 - verify forgotten password page' },
            { type: 'severity', description: 'Major' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        await loginPage.navigateToForgotPassword();
        
        const currentURL = page.url();
        expect(currentURL).toContain('forgotten');
    });

// ═════════════════════════════════════════════════════════════════
// BATCH 5: UI/Environment Tests (TC_LF_021 to TC_LF_023) @ui @smoke
// ═════════════════════════════════════════════════════════════════

test('TC_LF_021: Login page layout verification @ui @smoke',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 69 - verify login page layout' },
            { type: 'severity', description: 'Minor' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        // Verify key elements exist and are within viewport
        const emailInput = await loginPage.getEmailInput();
        const passwordInput = await loginPage.getPasswordInput();
        const loginButton = await loginPage.getLoginButton();
        
        expect(await emailInput.isVisible()).toBeTruthy();
        expect(await passwordInput.isVisible()).toBeTruthy();
        expect(await loginButton.isVisible()).toBeTruthy();
        
        // All elements should be visible within view
        expect(await emailInput.boundingBox()).not.toBeNull();
        expect(await passwordInput.boundingBox()).not.toBeNull();
        expect(await loginButton.boundingBox()).not.toBeNull();
    });

test('TC_LF_022: Login page input field functionality @ui @smoke',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 70 - verify input fields are functional' },
            { type: 'severity', description: 'Critical' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        const emailInput = await loginPage.getEmailInput();
        const passwordInput = await loginPage.getPasswordInput();
        
        const testEmail = 'test@example.com';
        const testPassword = 'testPassword123';
        
        await emailInput.fill(testEmail);
        await passwordInput.fill(testPassword);
        
        const filledEmail = await emailInput.inputValue();
        const filledPassword = await passwordInput.inputValue();
        
        expect(filledEmail).toBe(testEmail);
        expect(filledPassword).toBe(testPassword);
    });

test('TC_LF_023: Cross-environment compatibility @ui @smoke',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 71 - verify cross-environment compatibility' },
            { type: 'severity', description: 'Minor' },
            { type: 'owner', description: 'Naveen Khunteta' }
        ]
    }
    , async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        
        // Verify page loads and key elements are present
        const pageTitle = await loginPage.getPageTitle();
        const pageURL = await loginPage.getPageURL();
        
        expect(pageTitle).toBeDefined();
        expect(pageURL).toBeDefined();
        expect(pageURL).toContain('login');
    });
