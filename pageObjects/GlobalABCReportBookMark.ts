import { expect, Page, Locator } from '@playwright/test';

class GlobalABCReportBookMark{

    page: Page;
    select_admin_panel: Locator;
    select_global_bookmarks: Locator;
    select_dash_board: Locator;
    select_any_dashboard: Locator;
    select_refresh_dashboard: Locator;
    select_back_tolist: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.select_admin_panel = page.locator("//span[contains(text(),'Admin Panel')]")
        this.select_global_bookmarks = page.locator("//button[normalize-space()='Global ABC Reports Bookmarks']")
        this.select_dash_board = page.locator("//button[normalize-space()='Dashboards']")
        this.select_any_dashboard = page.locator("//p[contains(text(),'Freeze Analysis')]")
        this.select_refresh_dashboard = page.locator("//button[@class='reportsToolbarItem css-p8i7nt']//*[name()='svg']")
        this.select_back_tolist = page.locator("(//button[@class='reportsToolbarItem css-1ffh2v8'])[1]")
        
    }//constructor

//Validate GlobalABCReport Bookmarks
    async selectDashboard(){        
        await this.select_admin_panel.click();
        await this.select_global_bookmarks.click();
        await this.select_dash_board.click();
        await this.select_any_dashboard.click();
        await this.select_refresh_dashboard.waitFor({state:'visible',timeout:10000})
        await this.select_refresh_dashboard.click();        
        await this.select_back_tolist.click();
    } //Select Dashboard

}//class

export default GlobalABCReportBookMark;