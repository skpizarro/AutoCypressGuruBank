//Se realiza la verificacion de los casos de prueba Login, Crear Usuario , Crear Cuenta y Eliminar Cuenta



/// Se ignoran los errores de la pagina
Cypress.on('uncaught:exception', (err,runnable) =>{
    console.log('err:'+err);
    console.log('runnable:'+ runnable);
    return ralse
})



//Añadimios un test
describe('Guru99 Bank', () => {
    // por cada una de los test ejecuto cargo los objetos json
    beforeEach(()=> {
        cy.fixture('login.json').as('loginData');
        cy.fixture('newCustomer.json').as('newCustomerData');
        cy.fixture('newAccount.json').as('newAccountData');
        //cy.visit('http://demo.guru99.com/V4/index.php');
    });

    // test de login
    it('Test Ejercicio 2 Automatización',()=>{
        
        cy.visit('http://demo.guru99.com/V4/index.php');
        cy.get('@loginData').then(({userId,password}) =>{
            cy.log({userId,password}); //mostramos por consola los datos del usuario que ingresará para comprobar
            
            cy.get('[name = uid]').type(userId);
            cy.get('[name = password]').type(password, {log: false}); //ocultamos la contraseña del log
            cy.get('[type = submit]').click();
            cy.url().should('include', '/manager/Managerhomepage.php');
            
            // verificamos que el usuario si es el que ingresó
            cy.get('tr.heading3 > td').should('contain',userId);
        })
     

        // Creamos un nuevo Cliente
        cy.get('.menusubnav > :nth-child(2) > a').should('contain',"New Customer").click();
        
        cy.get('@newCustomerData').then(({customerName,gender,dateBirth,address,city,state,pin,mobileNumber,email,password}) => {
            
            // Se diligencian los campos del formulario
            cy.get(':nth-child(4) > :nth-child(2) > input').type(customerName);
            cy.get(`[value=${gender}]`).check().should('be.checked');
            cy.get('[type = date]').type(dateBirth);
            cy.get('textarea').type(address);
            cy.get(':nth-child(8) > :nth-child(2) > input').type(city);
            cy.get(':nth-child(9) > :nth-child(2) > input').type(state);
            cy.get(':nth-child(10) > :nth-child(2) > input').type(pin);
            cy.get(':nth-child(11) > :nth-child(2) > input').type(mobileNumber);
            cy.get(':nth-child(12) > :nth-child(2) > input').type(email);
            cy.get(':nth-child(13) > :nth-child(2) > input').type(password);
            cy.get('[type = submit]').click();
            cy.url().should('include','/CustomerRegMsg.php');

        });


        //Capturamos el Customer id
        let Cid = cy.get('tbody > tr:nth-child(4) > td:nth-child(2)').invoke("text").then(cid => {
            Cid = cid;
            console.log('el customer id es: '+Cid);
            cy.log('el customer id es: '+Cid);
            cy.get('.menusubnav > :nth-child(5) > a').should('contain',"New Account").click();
        });
        

        // Creamos una nueva cuenta
        cy.get('@newAccountData').then(({accountType,initialDeposit}) =>{
            // Se diligencian los campos del formulario
            cy.get('[name = cusid]').type(Cid).should('have.value',Cid);
            cy.get('[name = selaccount]').select(accountType).should('have.value',accountType);
            cy.get('[name = inideposit]').type(initialDeposit).should('have.value',initialDeposit);

            cy.get('[Type = submit]').click();
            cy.url().should('include','/AccCreateMsg.php');
        });

        // Capturamos el valor del Account id
        let Accid = cy.get('tbody > tr:nth-child(4) > td:nth-child(2)').invoke("text").then(accid =>{
            Accid = accid;
            console.log('el Account id es: '+Accid);
            cy.log('el Account id es: '+Accid);

            //Eliminar cuenta
            cy.get('.menusubnav > :nth-child(7) > a').should('contain',"Delete Account").click();
            // Se ingresa el Account id para eliminar la cuenta
            cy.get('[name = accountno]').type(Accid).should('have.value',Accid);

            cy.get('[type = submit]').click();
            cy.get('[type = button]').contains('Aceptar').click();
            cy.url().should('include','/Managerhomepage.php');
        });
    });

});

