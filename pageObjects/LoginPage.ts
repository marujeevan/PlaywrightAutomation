import { Page, Locator } from '@playwright/test';
import ENV from '../tests/utils/env';

class LoginPage{
    page: Page;
    URL: URL;
    txtBox_username: Locator;
    txtBox_password: Locator;
    btn_Login: Locator;
    btn_Hover: Locator;
    get_title: Locator;
    msg_incorrect_password: Locator;
    msg_incorrect_password_Label: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.txtBox_username = page.locator('#email');
        this.txtBox_password = page.locator('#password-label');
        this.btn_Login = page.locator('#mui-1');
        this.msg_incorrect_password = page.locator("//div[contains(text(),'Wrong e-mail or password!')]")
                                
    }//constructor
      async goToApplication(){        
       await this.page.goto(ENV.BASE_URL);   
      }
    async loginToApplication(username,password){        
        console.log('Filling ' + username + ' in Username textBox');
        await this.txtBox_username.waitFor({state:'visible'})
        await this.txtBox_username.fill(ENV.USERNAME);
        console.log('Filling ' + password + ' in Password textBox');
        await this.txtBox_password.fill(ENV.PASSWORD);               
        console.log('Clicking on Login button');
        await this.btn_Login.click();
                     
    }

    async InvalidloginToApplication(username,password){        
        console.log('Filling ' + username + ' in Username textBox');
        await this.txtBox_username.fill(ENV.USERNAME);
        console.log('Filling ' + password + ' in Password textBox');
        await this.txtBox_password.fill(password);       
        console.log('Clicking on Login button');
        await this.btn_Login.click();
               
    }

}

export default LoginPage;