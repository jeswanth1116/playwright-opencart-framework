import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';



export class LoginPage{

    //1. page locators/objects/OR:
    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly pasword: Locator;
    private readonly loginBtn: string;
    private readonly warningMsg: Locator;
    private readonly registerlink: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly forgotPasswordBtn: Locator;
    private readonly continueBtn: Locator;

    //2. page class constructor...
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.pasword = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = 'input[type="submit"][value="Login"]';
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerlink = page.getByText('Register', { exact: true });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' });
        this.forgotPasswordBtn = page.getByRole('link', { name: 'Forgotten Password' });
        this.continueBtn = page.getByRole('link', { name: 'Continue' });
    }

    //3. page actions/methods:
    /**
     * navigate to the login page
     */
    async goToLoginPage(baseURL: string | undefined) {
        await this.page.goto(baseURL+'?route=account/login');
    }

    /**
     * login to app using username/password
     * @param email 
     * @param password 
     * @returns 
     */
    async doLogin(email: string, password: string): Promise<HomePage> {
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.pasword, password);
        await this.eleUtil.click(this.loginBtn, { force: true, timeout: 5000 });
        return new HomePage(this.page);
    }

    /**
     * click login button without filling any credentials
     * @returns 
     */
    async clickLoginButton(): Promise<void> {
        await this.eleUtil.click(this.loginBtn, { force: true, timeout: 5000 });
    }

    /**
     * get the warning message in case of invalid login
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string | null> {
        const errorMesg = await this.eleUtil.getText(this.warningMsg);
        console.log('invalid login warning message: ' + errorMesg);
        return errorMesg;
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        await this.eleUtil.click(this.registerlink, { force: true }, 1);
        return new RegisterPage(this.page);
    }

    /**
     * Get forgotten password link element
     * @returns forgotten password link locator
     */
    async getForgotPasswordLink(): Promise<Locator> {
        return this.forgotPasswordLink;
    }

    /**
     * Check if forgotten password link is visible
     * @returns boolean
     */
    async isForgotPasswordLinkVisible(): Promise<boolean> {
        return await this.eleUtil.isVisible(this.forgotPasswordLink, 0);
    }

    /**
     * Navigate to forgotten password page
     */
    async navigateToForgotPassword(): Promise<void> {
        await this.eleUtil.click(this.forgotPasswordLink, { force: true }, 1);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get email input field
     * @returns email input locator
     */
    async getEmailInput(): Promise<Locator> {
        return this.emailId;
    }

    /**
     * Get password input field
     * @returns password input locator
     */
    async getPasswordInput(): Promise<Locator> {
        return this.pasword;
    }

    /**
     * Get email field placeholder
     * @returns placeholder text
     */
    async getEmailPlaceholder(): Promise<string | null> {
        return await this.emailId.getAttribute('placeholder');
    }

    /**
     * Get password field placeholder
     * @returns placeholder text
     */
    async getPasswordPlaceholder(): Promise<string | null> {
        return await this.pasword.getAttribute('placeholder');
    }

    /**
     * Verify if password is masked (input type = password)
     * @returns boolean
     */
    async isPasswordMasked(): Promise<boolean> {
        const inputType = await this.pasword.getAttribute('type');
        return inputType === 'password';
    }

    /**
     * Navigate to register page via Continue button
     */
    async navigateToContinueButton(): Promise<void> {
        await this.eleUtil.click(this.continueBtn, { force: true });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get page title
     * @returns page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current page URL
     * @returns page URL
     */
    async getPageURL(): Promise<string> {
        return this.page.url();
    }

    /**
     * Fill email and password fields
     * @param email email address
     * @param password password value
     */
    async fillEmailAndPassword(email: string, password: string): Promise<void> {
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.pasword, password);
    }

    /**
     * Get login button element
     * @returns login button locator
     */
    async getLoginButton(): Promise<Locator> {
        return this.page.locator(this.loginBtn);
    }

    /**
     * Check if warning message is visible
     * @returns boolean
     */
    async isWarningMessageVisible(): Promise<boolean> {
        return await this.eleUtil.isVisible(this.warningMsg, 0);
    }

    /**
     * Multiple login attempts with invalid credentials
     * @param email invalid email
     * @param password invalid password
     * @param attempts number of attempts
     */
    async multipleLoginAttempts(email: string, password: string, attempts: number): Promise<void> {
        for (let i = 0; i < attempts; i++) {
            await this.eleUtil.fill(this.emailId, email);
            await this.eleUtil.fill(this.pasword, password);
            await this.eleUtil.click(this.loginBtn, { force: true, timeout: 5000 });
            await this.page.waitForTimeout(500);
        }
    }




}