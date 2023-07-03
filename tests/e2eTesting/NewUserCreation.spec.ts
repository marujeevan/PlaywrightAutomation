import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObjects/LoginPage';
import WorkspacePage from '../../pageObjects/WorkspacePage';
import { faker } from '@faker-js/faker';
import ENV from '../utils/env';

// JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require('../../testData/Datavalidation.json')));

let loginPage: LoginPage
let Workspace: WorkspacePage

test.beforeEach(async ({ page },testInfo) => {
  loginPage = new LoginPage(page);
  Workspace = new WorkspacePage(page); 
  testInfo.setTimeout(testInfo.timeout + 30000);
  //Log in to Fitnessbi application
  await loginPage.goToApplication();
  await loginPage.loginToApplication(ENV.USERNAME,ENV.PASSWORD);
   // Select a workspace name as Forma Gym 
  await Workspace.selectWorkSpace(dataSet.validate_workspace) 
})

test.describe('New User creation Scenario', () => {  
test('TC_DNAAPP_979 New User Creation @e2e', async ( {page} ) => {          
    //Select User tab to create new user    
   await Workspace.newUserCreation(faker.name.fullName(),faker.internet.email(),faker.phone.number())
   
})

test('TC_DNAAPP_980 Edit User @onetime', async ( {page} ) => { 
    //Select newly created user from Users tab
    await Workspace.editUser(dataSet.username,dataSet.EditUsername)
    await page.reload()
})

test('TC_DNAAPP_981 delete User @onetime', async ( {page} ) => { 
   //Select newly created user from Users tab
    await Workspace.deleteUser(dataSet.deleteusername)
   })
})