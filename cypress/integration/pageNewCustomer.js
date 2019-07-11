//Se realiza la verificacion 



/// Se ignoran los errores de la pagina
Cypress.on('uncaught:exception', (err,runnable) =>{
    console.log('err:'+err);
    console.log('runnable:'+ runnable);
    return ralse
})


//Añadimios un test
describe('Guru99 Bank', () => {
    // por cada una de los test visito la pagia
    beforeEach(()=> {
        cy.fixture('login.json').as('loginData');
        cy.fixture('newCustomer.json').as('newCustomerData');
        //cy.visit('http://demo.guru99.com/V4/index.php');
    });

    // test de login
    it('login',()=>{
        cy.visit('http://demo.guru99.com/V4/index.php');
        cy.get('@loginData').then(({userId,password}) =>{
            cy.log({userId,password});
            console.log("User ID: "+userId+"  Password: "+password);
            //cy.get(':nth-child(1) > :nth-child(2) > input')
            cy.get('[name = uid]').type(userId);
            cy.get('[name = password]').type(password, {log: false}); //ocultamos la contraseña del log
            cy.url().should('include', '/manager/Managerhomepage.php');
            //cy.get('tr.heading3 > td').should('include',userId);
        })
    });

    //Test que el usuario si es con el que ingresó
    it('Manager ID',()=>{
        cy.get('@loginData').then(({userId}) => {
            cy.get('tr.heading3 > td').should('contain',userId);
        })
    });

    // Test New Customer
    it('New Customer',() => {
        cy.get('.menusubnav > :nth-child(2) > a').should('contain',"New Customer").click();
        cy.get('@newCustomerData').then(({customerName,gender,dateBirth,address,city,state,pin,mobileNumber,email,password}) => {
            
            cy.get(':nth-child(4) > :nth-child(2) > input').type(customerName);
            cy.get(`[value=${gender}]`).check().should('be.checked');
            cy.get('[type = date]').type(dateBirth);
            cy.get('textarea').type(address);
            cy.get(':nth-child(8) > :nth-child(2) > input').type(city);
            cy.get(':nth-child(9) > :nth-child(2) > input').type(state);
            cy.get(':nth-child(10) > :nth-child(2) > input').type(pin);
            cy.get(':nth-child(11) > :nth-child(2) > input').type(mobileNumber);
            cy.get(':nth-child(12) > :nth-child(2) > input').type(email);
            cy.get(':nth-child(13) > :nth-child(2) > input').type(password, {log: false});
            
            //cy.url().should('include', '/manager/insrtCustomer.php');
        })
        cy.get('[type = submit]').click();
    })
});


