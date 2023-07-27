export class LoginPage
{
    login_admin()
    {
        cy.fixture('test_Items').then((data)=>
        {
            const testdata=data
            cy.intercept('POST', '**/push' ).as('postLogin')
            const admin_username = testdata.credentials.admin_username;
            const admin_password = testdata.credentials.admin_password;
            cy.get('input[name=username]').clear().type(admin_username)
            cy.get('input[name=password]').type(admin_password)
            cy.get('button[type=submit]').click()
            cy.wait('@postLogin').then(xhr =>
                {
                    expect(xhr.response.statusCode).to.equal(200)
                })
        })
    }

    login_employee()
    {
        cy.fixture('test_Items').then((data)=>
        {
            const testdata=data
            cy.intercept('POST', '**/push' ).as('postLogin')
            const employee_username = testdata.employee.username;
            const employee_password = testdata.employee.password;
            cy.get('input[name=username]').clear().type(employee_username)
            cy.get('input[name=password]').type(employee_password)
            cy.get('button[type=submit]').click()
            cy.wait('@postLogin').then(xhr =>
                {
                    expect(xhr.response.statusCode).to.equal(200)
                })
        })
    }

    log_out()
    {
        cy.get('.oxd-userdropdown-name').click()
        cy.get('[role=menuitem]').eq(3).click()
    }
}

export const onLoginPage = new LoginPage()