import { expect, Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';


export class RegisterPage{

    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMsg: Locator;
    private readonly warningMsg: Locator;
    private readonly loginLink: Locator;
    private readonly eleUtil;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);

        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        this.agreeCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByText('Your Account Has Been Created!', { exact: true});
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.loginLink = page.getByRole('link', { name: 'Login' });
    }

    /**
     * Navigate to register page
     * @param baseURL base URL of application
     */
    async navigateToRegister(baseURL: string | undefined): Promise<void> {
        await this.page.goto(baseURL + '?route=account/register');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Fill first name field
     * @param firstName first name value
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.eleUtil.fill(this.firstNameInput, firstName);
    }

    /**
     * Fill last name field
     * @param lastName last name value
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.eleUtil.fill(this.lastNameInput, lastName);
    }

    /**
     * Fill email field
     * @param email email address
     */
    async fillEmail(email: string): Promise<void> {
        await this.eleUtil.fill(this.emailInput, email);
    }

    /**
     * Fill telephone field
     * @param telephone phone number
     */
    async fillTelephone(telephone: string): Promise<void> {
        await this.eleUtil.fill(this.telephoneInput, telephone);
    }

    /**
     * Fill password field
     * @param password password value
     */
    async fillPassword(password: string): Promise<void> {
        await this.eleUtil.fill(this.passwordInput, password);
    }

    /**
     * Fill password confirm field
     * @param password password confirmation value
     */
    async fillConfirmPassword(password: string): Promise<void> {
        await this.eleUtil.fill(this.confirmPasswordInput, password);
    }

    /**
     * Check privacy policy checkbox
     */
    async checkPrivacyPolicy(): Promise<void> {
        await this.eleUtil.click(this.agreeCheckbox);
    }

    /**
     * Check if privacy policy is already checked
     * @returns boolean
     */
    async isPrivacyPolicyChecked(): Promise<boolean> {
        return await this.agreeCheckbox.isChecked();
    }

    /**
     * Select newsletter option
     * @param option 'Yes' or 'No'
     */
    async selectNewsletter(option: 'Yes' | 'No'): Promise<void> {
        if (option === 'Yes') {
            await this.eleUtil.click(this.newsletterYesRadio);
        } else {
            await this.eleUtil.click(this.newsletterNoRadio);
        }
    }

    /**
     * Click continue button
     */
    async clickContinue(): Promise<void> {
        await this.eleUtil.click(this.continueButton);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get success message text
     * @returns success message or empty string
     */
    async getSuccessMessage(): Promise<string> {
        try {
            const text = await this.successMsg.textContent({ timeout: 5000 });
            return text || '';
        } catch (e) {
            return '';
        }
    }

    /**
     * Get warning/error message
     * @returns warning message or empty string
     */
    async getWarningMessage(): Promise<string> {
        try {
            const text = await this.warningMsg.textContent({ timeout: 5000 });
            return text || '';
        } catch (e) {
            return '';
        }
    }

    /**
     * Get first name error message
     * @returns error message or empty string
     */
    async getFirstNameError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="firstname"]/following-sibling::div[@class="text-danger"]');
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get last name error message
     * @returns error message or empty string
     */
    async getLastNameError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="lastname"]/following-sibling::div[@class="text-danger"]');
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get email error message
     * @returns error message or empty string
     */
    async getEmailError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="email"]/following-sibling::div[@class="text-danger"]');
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get telephone error message
     * @returns error message or empty string
     */
    async getTelephoneError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="telephone"]/following-sibling::div[@class="text-danger"]');
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get password error message
     * @returns error message or empty string
     */
    async getPasswordError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="password"]/following-sibling::div[@class="text-danger"]').first();
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get password confirm error message
     * @returns error message or empty string
     */
    async getPasswordConfirmError(): Promise<string> {
        const errorLocator = this.page.locator('//input[@name="confirm"]/following-sibling::div[@class="text-danger"]');
        const text = await this.eleUtil.getText(errorLocator);
        return text || '';
    }

    /**
     * Get page title
     * @returns page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get page URL
     * @returns current page URL
     */
    async getPageURL(): Promise<string> {
        return this.page.url();
    }

    /**
     * Check if password input is masked
     * @returns boolean
     */
    async isPasswordMasked(): Promise<boolean> {
        const inputType = await this.passwordInput.getAttribute('type');
        return inputType === 'password';
    }

    /**
     * Check if password confirm input is masked
     * @returns boolean
     */
    async isPasswordConfirmMasked(): Promise<boolean> {
        const inputType = await this.confirmPasswordInput.getAttribute('type');
        return inputType === 'password';
    }

    /**
     * Navigate back to login page
     */
    async clickLoginPageLink(): Promise<void> {
        await this.eleUtil.click(this.loginLink);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get first name placeholder
     * @returns placeholder text or empty string
     */
    async getFirstNamePlaceholder(): Promise<string | null> {
        return await this.firstNameInput.getAttribute('placeholder');
    }

    /**
     * Get last name placeholder
     * @returns placeholder text or empty string
     */
    async getLastNamePlaceholder(): Promise<string | null> {
        return await this.lastNameInput.getAttribute('placeholder');
    }

    /**
     * Get email placeholder
     * @returns placeholder text or empty string
     */
    async getEmailPlaceholder(): Promise<string | null> {
        return await this.emailInput.getAttribute('placeholder');
    }

    /**
     * Get telephone placeholder
     * @returns placeholder text or empty string
     */
    async getTelephonePlaceholder(): Promise<string | null> {
        return await this.telephoneInput.getAttribute('placeholder');
    }

    /**
     * Clear all form fields
     */
    async clearAllFields(): Promise<void> {
        await this.firstNameInput.clear();
        await this.lastNameInput.clear();
        await this.emailInput.clear();
        await this.telephoneInput.clear();
        await this.passwordInput.clear();
        await this.confirmPasswordInput.clear();
    }

    /**
     * Register user with all parameters (original method)
     */
    async registerUser(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribeNewsletter: string
    ): Promise<boolean> {

        await this.eleUtil.fill(this.firstNameInput, firstName);
        await this.eleUtil.fill(this.lastNameInput, lastName);
        await this.eleUtil.fill(this.emailInput, email);
        await this.eleUtil.fill(this.telephoneInput, telephone);
        await this.eleUtil.fill(this.passwordInput, password);
        await this.eleUtil.fill(this.confirmPasswordInput, password);

        if (subscribeNewsletter === 'Yes') {
            await this.eleUtil.click(this.newsletterYesRadio);
        } else {
            await this.eleUtil.click(this.newsletterNoRadio);
        }

        await this.eleUtil.click(this.agreeCheckbox);
        await this.eleUtil.click(this.continueButton);
        //await this.page.waitForTimeout(3000);
        //return await this.eleUtil.isVisible(this.successMsg);
        await expect(this.successMsg).toBeVisible();
        return true;
    }
}