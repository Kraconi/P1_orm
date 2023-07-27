describe('login', ()=>
{
    let userId
    let testData

    beforeEach('open application',()=>
    {
        // cy.visit('https://opensource-demo.orangehrmlive.com/')
        // cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.openApp()
        cy.fixture('test_Items').then((data)=>
        {
            testData=data   
        })
    })

    xit('admin_login_valid', ()=>
    {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').clear().type('admin123')

        cy.get('button[type=submit]').click()

        cy.url().should('contain','dashboard')
        cy.get('.oxd-brand-banner').find('img').should('be.visible')
    });

    xit('admin_login_invalid', ()=>
    {
        cy.get('input[name=username]').clear().type('Admin123')
        cy.get('input[name=password]').clear().type('admin123')

        cy.get('button[type=submit]').click()

        cy.get('.oxd-alert-content-text').should('contain','Invalid credentials')

    });

    xit('admin_login_invalid2',()=>
    {
        cy.get('input[name=username]').clear().type('Admin123')
        cy.get('input[name=password]').clear().type('admin123')

        cy.get('button[type=submit]').click()

        cy.get('[role=alert]').should('be.visible')
    });

    xit('admin_url_check',()=>
    {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').clear().type('admin123')
        cy.get('button[type=submit]').click()
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        // cy.get('.oxd-sidepanel-body').find('li').first().click()
        cy.get('.oxd-sidepanel-body li').first().first().click()
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
    });

    xit('admin_heading_check',()=>
    {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').clear().type('admin123')
        cy.get('button[type=submit]').click()
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        // cy.get('.oxd-sidepanel-body').find('li').first().click()
        cy.get('.oxd-sidepanel-body li').first().first().click()
        cy.get('.oxd-topbar-header-breadcrumb-module').contains('Admin')
    });

    xit('directory_card_check',()=>
    {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').clear().type('admin123')
        cy.get('button[type=submit]').click()
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory#')
        // cy.get('.oxd-sidepanel-body').find('li').first().click()
        cy.get('.oxd-grid-4 .oxd-grid-item.oxd-grid-item--gutters').first().click()
        cy.get('.orangehrm-corporate-directory-sidebar').should('be.visible')
    });

    xit('sidebar_arrow_check',()=>
    {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').clear().type('admin123')
        cy.get('button[type=submit]').click()
        // cy.get('.oxd-main-menu-search .oxd-icon-button.oxd-main-menu-button').click()
        cy.get('.oxd-main-menu-search i').click()
        cy.get('.oxd-main-menu-search i').invoke('attr', 'class').should('contain', 'right');
    });
    //npx cypress open
});