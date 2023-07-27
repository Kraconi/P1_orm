const { onLoginPage } = require("../support/page_objects/login_page")
const { onPagePIM } = require("../support/page_objects/PIM_page")

describe('admin_user',()=>
{
    let testdata
    let first
    let middle
    let last
    let username
    let password
    
    beforeEach('setUp',()=>
    {
        cy.openApp()
        cy.fixture('test_Items').then((data)=>
        {
            testdata=data
            first=testdata.employee.firstName;
            middle=testdata.employee.middleName;
            last=testdata.employee.lastName;
            username=testdata.employee.username;
            password=testdata.employee.password;
        })
        onLoginPage.login_admin()
        onPagePIM.pim_visit()
    })


    it('add/delete_user',()=>
    {
        // cy.intercept('POST','**/password').as('msg')
        onPagePIM.add_visit()
        cy.get('.oxd-switch-input').click()
        onPagePIM.add_info_full()
        cy.get('[type=submit]').click()
        
        cy.get('.oxd-grid-2.orangehrm-full-width-grid input').invoke('val').then((value)=>
        {
            const savedText=String(value)
            cy.wrap(savedText).as('savedText');
        })
        
        // cy.wait('@msg').then((msg)=>
        // {
        //     expect (msg.response.statusCode).to.equal(200)
        // })
        
        onLoginPage.log_out()
        onLoginPage.login_employee()
        cy.visit(testdata.url.Time)
        cy.get('.oxd-button--secondary').click()
        cy.get('.orangehrm-timesheet-footer--title p').should('include','Submitted')
        onLoginPage.log_out()
        onLoginPage.login_admin()
        onPagePIM.pim_visit()
        cy.get('@savedText').then((text)=>
        {
            cy.get('.oxd-form-row .oxd-input.oxd-input--active').type(text)
        })
        cy.get('[type=submit]').click()
    })
})
