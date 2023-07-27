const { onLoginPage } = require("../support/page_objects/login_page")

describe('admin_login', ()=>
{
    let testdata
    let first
    let middle
    let last

    beforeEach('open application',()=>
    {
        cy.openApp()
        // cy.visit('https://opensource-demo.orangehrmlive.com/')
        // cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.fixture('test_Items').then((data)=>
        {
            testdata=data
            first=testdata.employee.firstName;
            middle=testdata.employee.middleName;
            last=testdata.employee.lastName;
        })
        onLoginPage.login_admin()
    })

    xit('add/delete_user',()=>
    {
        // cy.get('input[name=username]').clear().type('Admin')
        // cy.get('input[name=password]').clear().type('admin123')
        // cy.get('button[type=submit]').click()
        // login_admin()
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
        cy.get('.orangehrm-header-container button').click()
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee')
        cy.get('[name=firstName]').clear().type(first)
        cy.get('[name=middleName]').clear().type(middle)
        cy.get('[name=lastName]').clear().type(last)
        cy.get('[type=submit]').click()

        cy.get('.oxd-grid-2.orangehrm-full-width-grid input').invoke('val').then((value)=>
        {
            const savedText=String(value)
            cy.wrap(savedText).as('savedText');
        })
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
        cy.get('@savedText').then((savedText)=>
        {
            cy.get('.oxd-form-row .oxd-input.oxd-input--active').type(savedText)
        })

        cy.get('[type=submit]').click()
        
        cy.get('.oxd-table-card button').first().click()
        cy.get('[role="document"]').should('be.visible')

        cy.intercept('DELETE','**/employees').as('msg')//interpretacija delete zahteva

        cy.get('.orangehrm-modal-footer button').eq(1).click()

        //cekanje delete poruke 
        
        cy.wait('@msg').then(msg=>
            {
                expect(msg.response.statusCode).to.equal(200)
            })
        //verif preko labela
        // cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding span').contains("No Records Found")
    }); 

    xit('add/delete employee',()=>
    {
        onLoginPage.login_admin()
    })
});



