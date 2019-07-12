

Cypress.Commands.add('Uid',({uid})=>{
    console.log('Este es el custom id'+uid);
    return uid;
});

Cypress.Commands.add('Accid',({accid})=>{
    cy.log('Este es el id de la cuenta '+accid);
    return accid;
});
