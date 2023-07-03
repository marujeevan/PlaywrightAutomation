import { test, expect} from '@playwright/test';
import LoginPage from '../../pageObjects/LoginPage';
import ENV from '../utils/env';

// JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require('../../testData/Datavalidation.json')));

let loginPage: LoginPage
test.beforeEach(async ({ page },testInfo) => {
  loginPage = new LoginPage(page); 
  testInfo.setTimeout(testInfo.timeout + 30000); 
  await loginPage.goToApplication(); 
})

test.describe('User Login ', () => { 
test('TC_DNAAPP_977 Login Successful @@e2e', async ( {page} ) => { 
  await loginPage.loginToApplication(ENV.USERNAME,ENV.PASSWORD);
  /******************** Assertion Validate Title on page */
  const data_enter_title = dataSet.title;
  await expect(page).toHaveTitle(data_enter_title)
  })

test('TC_DNAAPP_978 User Login Unsuccessful @e2e', async ( {} ) => {   

  /****************** Login UnSuccessful - START *******************/  
   await loginPage.InvalidloginToApplication(ENV.USERNAME,ENV.INVALID_PASSWORD);
   const InvalidErrorMessage = await loginPage.msg_incorrect_password.textContent()
   expect(InvalidErrorMessage).toContain('Wrong')
   
   })
})