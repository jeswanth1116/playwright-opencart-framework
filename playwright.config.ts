import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests sequentially for better visibility */
  fullyParallel: false,

  /* Number of workers - set to 1 for sequential execution */
  workers: 1,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Test timeout - increased for slower execution */
  timeout: 60000,

  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright'],
    ['playwright-html-reporter', {
      testFolder: 'tests',
      title: 'OPEN CART HTML Report',
      project: 'Open Cart',
      release: '9.87.6',
      testEnvironment: 'PROD',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report',
      minifyAssets: true,
      startServer: false,
    }]
  ],

  /* Shared settings for all projects */
  use: {
    /* Browser will be visible */
    headless: false,

    /* Base URL */
    baseURL: 'https://naveenautomationlabs.com/opencart/index.php',

    /* Collect trace */
    trace: 'on',

    /* Take screenshots */
    screenshot: 'on',

    /* Record video */
    video: 'on',

    /* Navigation timeout */
    navigationTimeout: 30000,

    /* Action timeout */
    actionTimeout: 15000,

    /* HTTP credentials */
    httpCredentials: {
      username: 'admin',
      password: 'admin'
    }
    // ✅ Removed launchOptions from here - it doesn't belong here!
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        viewport: null,
        launchOptions: {
          slowMo: 500,  // ✅ slowMo ONLY here (project-specific)
          args: ['--start-maximized'],
          ignoreDefaultArgs: ['--window-size=1280,720']
        }
      },
      metadata: {
        appUsername: 'jeswanth1116@gmail.com',
        appPassword: 'Test@1234'
      }
    },
  ],
});