/**
 * DataGenerator: Utility class for generating test data
 */
export class DataGenerator {
    
    /**
     * Generate a random invalid email address
     * @returns random invalid email
     */
    static generateRandomEmail(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `testuser_${timestamp}_${random}@invalid.com`;
    }

    /**
     * Generate a random password with special characters
     * @param length password length (default: 12)
     * @returns random password
     */
    static generateRandomPassword(length: number = 12): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    /**
     * Generate a random alphanumeric string
     * @param length string length (default: 8)
     * @returns random string
     */
    static generateRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generate special characters string
     * @returns special characters string
     */
    static generateSpecialCharacters(): string {
        return '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    /**
     * Generate a random number
     * @param min minimum value
     * @param max maximum value
     * @returns random number between min and max
     */
    static generateRandomNumber(min: number = 1, max: number = 1000): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate a random first name
     * @returns random first name
     */
    static generateRandomFirstName(): string {
        const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa', 'Robert', 'Maria'];
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    }

    /**
     * Generate a random last name
     * @returns random last name
     */
    static generateRandomLastName(): string {
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    /**
     * Generate a random phone number
     * @returns random phone number in format XXXXXXXXXX (10 digits)
     */
    static generateRandomPhone(): string {
        const areaCode = Math.floor(Math.random() * 900) + 100;
        const middle = Math.floor(Math.random() * 900) + 100;
        const last = Math.floor(Math.random() * 9000) + 1000;
        return `${areaCode}${middle}${last}`;
    }

    /**
     * Generate an invalid email address (missing components)
     * @returns invalid email format
     */
    static generateInvalidEmail(): string {
        const invalidEmails = ['amotoori', 'amotoori@', 'amotoori@gmail', 'amotoori@gmail.'];
        return invalidEmails[Math.floor(Math.random() * invalidEmails.length)];
    }

    /**
     * Generate an invalid phone number
     * @returns invalid phone format
     */
    static generateInvalidPhone(): string {
        const invalidPhones = ['111', 'abcde', '12'];
        return invalidPhones[Math.floor(Math.random() * invalidPhones.length)];
    }
}
