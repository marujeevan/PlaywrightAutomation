import { Page, Locator } from '@playwright/test';

class WorkspacePage{
    page: Page;
    select_workspace_search: Locator;
    select_workspace_search_img: Locator;
    select_new_user: Locator;
    select_create_new_user: Locator;
    select_name: Locator;
    select_email: Locator;
    select_phone: Locator;
    select_role: Locator;
    role_dropdown: Locator;
    select_save_button: Locator;
    select_bulk_create_user_btn: Locator;
    select_uploadbtn: Locator;
    select_downloadbulkuser: Locator;
    select_file: Locator;
    send_emailforbulkusers_btn: Locator;
    confirm_popup_btn: Locator;
    confirm_bulkusersmsg: Locator;
    msg_bulkuser_success: Locator;
    search_username: Locator;
    select_threedot: Locator;
    select_edit: Locator;
    select_editname: Locator;
    delete_user_btn: Locator;
    confirm_user_creation: Locator;
    
    constructor(page: Page){
        this.page = page;
		//Workspace Search
        this.select_workspace_search = page.locator("#dashbord-search");
        this.select_workspace_search_img = page.getByRole('img', { name: 'WorkspaceImage' })
        //Create New User 		
        this.select_new_user = page.getByRole('tab', { name: 'Users' }) 
        this.select_create_new_user = page.getByText('Open create menuCreate User')
        this.select_name = page.locator("[name='Name']")
        this.select_email = page.locator("[name='Email']")
        this.select_phone = page.locator("[name='Phone']")
        this.select_role= page.locator(".MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.css-qiwgdb")
        this.role_dropdown = page.getByRole('option', { name: 'Analyze Manager' })
        this.select_save_button = page.locator("//button[normalize-space()='Save']")

        //bulk user creation locators       
        this.select_bulk_create_user_btn = page.locator("//button[normalize-space()='Bulk Create Users']")
        this.select_uploadbtn = page.locator("//span[contains(text(),'Click to upload')]")
        this.select_file = page.locator("//input[@type='file']")
        this.send_emailforbulkusers_btn = page.locator("div[class='jss110 css-j7qwjs'] button:nth-child(1)")
        this.confirm_bulkusersmsg = page.locator("//span[normalize-space()='Your file Template.csv succesfully uploaded']")
        this.confirm_popup_btn = page.locator("//button[normalize-space()='Confirm']")
        this.confirm_user_creation = page.locator("//div[contains(text(),'Bulk Users Created Successfully')]")
        this.msg_bulkuser_success = page.locator("//div[contains(text(),'Emails Triggered to Pending Users successfully!')]")

        //Edit User
        this.search_username = page.locator("#users-search")
        this.select_threedot = page.locator("//*[name()='path' and contains(@d,'M12 8c1.1 ')]")
        this.select_edit = page.locator("li:nth-child(1) span:nth-child(2)")
        this.select_editname = page.locator("[name='Name']")

        // Delete User
        this.delete_user_btn = page.locator("//span[normalize-space()='Delete']")     

    }//constructor
        async selectWorkSpace(workspacename){
        await this.select_workspace_search.waitFor({state:'visible'})
	    await this.select_workspace_search.fill(workspacename);
        await this.select_workspace_search_img.waitFor({state:'visible'})
        await this.select_workspace_search_img.click();
    } //search Workspace

     async newUserCreation(username,email,phone){        
        await this.select_new_user.click(); 
        await this.select_create_new_user.click();
        await this.select_name.fill(username);
        await this.select_email.fill(email);
        await this.select_phone.fill(phone);
        await this.select_role.click();
        await this.role_dropdown.click();
        await this.select_save_button.click();
                
    } //Create new user
     async bulkUserCreation(){ 
        await this.select_new_user.click(); 
        await this.select_bulk_create_user_btn.waitFor({state:'visible', timeout:8000})
        await this.select_bulk_create_user_btn.click();
        await this.select_file.setInputFiles("./downloads/Template.csv")  
        await this.confirm_bulkusersmsg.waitFor({state:'visible', timeout:5000})
        await this.select_save_button.click();
        await this.page.waitForTimeout(5000);
        await this.page.reload();
       // await this.send_emailforbulkusers.waitFor({state:'visible',timeout:10000})
        await this.send_emailforbulkusers_btn.click();
        await this.confirm_popup_btn.waitFor({state:'visible',timeout:4000})
        await this.confirm_popup_btn.click();                   
    } //bulk user creation

    //Edit User
    async editUser(username,newUsername){ 
        await this.select_new_user.click();     
        await this.search_username.type(username);
        await this.select_threedot.click();
        await this.select_edit.click();
        await this.select_editname.clear();
        await this.select_editname.type(newUsername);
        await this.select_save_button.click();
    }
    // Delete User
    async deleteUser(username){ 
        await this.select_new_user.click();     
        await this.search_username.type(username);
        await this.select_threedot.click();
        await this.delete_user_btn.click();
        await this.confirm_popup_btn.click();
    }
}//class

export default WorkspacePage;