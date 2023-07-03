import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObjects/LoginPage';
import WorkspacePage from '../../pageObjects/WorkspacePage';
import ENV from '../utils/env';
import { matchers } from 'playwright-expect';

// JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require('../../testData/Datavalidation.json')));
let loginPage: LoginPage
let Workspace: WorkspacePage 

test.beforeEach(async ({ page },testInfo) => {
  loginPage = new LoginPage(page);
  Workspace = new WorkspacePage(page);
  testInfo.setTimeout(testInfo.timeout + 30000);
  await loginPage.goToApplication()
  await loginPage.loginToApplication(ENV.USERNAME,ENV.PASSWORD)
  await Workspace.selectWorkSpace(dataSet.validate_workspace)

})
test.describe('bulk Users creation', () => {  
test('TC_DNAAPP_982 bulk Users Creation @onetime', async ( {page} ) => { 
  //Log in to Apllication  
    // Select a workspace name as Forma Gym  
   await Workspace.bulkUserCreation()
 // const bulkuserSuccessMessage = await Workspace.msg_bulkuser_success.textContent()
  //expect(bulkuserSuccessMessage).toContainText('Emails Triggered to Pending Users successfully ')
  
    
  })

})