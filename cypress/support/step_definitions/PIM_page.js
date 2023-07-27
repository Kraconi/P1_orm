// var saved_id;

export class PagePIM
{
    pim_visit()
    {
        cy.fixture('test_Items').then((data) =>
        {
            cy.url().then((url)=>
            {
                if(url!==data.url.PIM)
                {
                    cy.visit(data.url.PIM)
                }
            })
        })
    }

    add_visit()
    {
        cy.fixture('test_Items').then((data)=>
        {
            cy.url().then((url)=>
            {
                if(url!==data.url.AddPIM)
                {
                    cy.visit(data.url.AddPIM)
                }
            })
        })
    }

    add_info_basic()
    {
        cy.fixture('test_Items').then((data)=>
        {
            cy.get('[name=firstName]').clear().type(data.employee.firstName)
            cy.get('[name=middleName]').clear().type(data.employee.middleName)
            cy.get('[name=lastName]').clear().type(data.employee.lastName)
            cy.get('[type=submit]').click()
        })
    }

    add_info_full()
    {
        cy.fixture('test_Items').then((data)=>
        {
            cy.get('[name=firstName]').clear().type(data.employee.firstName)
            cy.get('[name=middleName]').clear().type(data.employee.middleName)
            cy.get('[name=lastName]').clear().type(data.employee.lastName)
            cy.get('[autocomplete=off]').eq(0).type(data.employee.username)
            cy.get('[autocomplete=off]').eq(1).type(data.employee.password)
            cy.get('[autocomplete=off]').eq(2).type(data.employee.password)
            cy.get('[type=submit]').click()
        })
    }

    // save_id()
    // {
    //     cy.get('.oxd-grid-2.orangehrm-full-width-grid input').invoke('val').then((value)=>
    //     {
    //         const savedText=String(value)
    //         cy.wrap(savedText).as('savedText');
    //         this.saved_id='@savedText'
    //     })
    // }
}

export const onPagePIM = new PagePIM()