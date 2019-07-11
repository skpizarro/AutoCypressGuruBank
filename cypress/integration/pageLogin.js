//Se realiza la verificacion del login y se verifica que el Manager ID sea el mismo usuario que ingresó


//Añadimios un test
describe('Guru99 Bank', () => {
    // por cada una de los test visito la pagia
    beforeEach(()=> {
        cy.fixture('login.json').as('loginData');
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
    })
});


