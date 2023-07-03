import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObjects/LoginPage';
import WorkspacePage from '../../pageObjects/WorkspacePage';
import GlobalABCReportBookMark from '../../pageObjects/GlobalABCReportBookMark';
import ENV from '../utils/env';

// JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require('../../testData/Datavalidation.json')));

let loginPage: LoginPage
let Workspace: WorkspacePage
let GlobalBookMark: GlobalABCReportBookMark

test.beforeEach(async ({ page },testInfo) => {
  loginPage = new LoginPage(page);
  Workspace = new WorkspacePage(page); 
  GlobalBookMark= new GlobalABCReportBookMark(page);
  testInfo.setTimeout(testInfo.timeout + 30000);  
  await loginPage.goToApplication();
  await loginPage.loginToApplication(ENV.USERNAME,ENV.PASSWORD); 
  await Workspace.selectWorkSpace(dataSet.validate_workspace);
})

test.describe('GlobalABCReport Bookmarks', () => { 
test('TC_DNAAPP_983 Verify GlobalABCReport Bookmarks @e2e', async ({ page }) => {
           // Select a workspace name as Forma Gym   
          //Select DashBoard from Globalbookmarks
      await GlobalBookMark.selectDashboard()
     })
})