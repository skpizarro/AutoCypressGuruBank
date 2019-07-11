Cypress.on('uncaught:exception', (err, runnable) => {
  console.log("err :" + err)
  console.log("runnable :" + runnable)
  return false
})


describe("It does the exercise 3 of testing workshop", () => {
  beforeEach(() => {
    cy.fixture("users/admin").as("admin");
    cy.fixture("deposits/basicDeposit").as("deposit");
    cy.fixture("customers/basicCustomer").as("customer");
    cy.fixture("accounts/basicAccount").as("account");
  })

/*   it("Should be able to login as admin", function () {
    cy.visit("http://demo.guru99.com/V4/index.php");
    cy.get("input[type='text']")
      .type(this.admin.UserID)
      .should("have.value", this.admin.UserID);
    cy.get("input[type='password']")
      .type(this.admin.Password)
      .should("have.value", this.admin.Password);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "http://demo.guru99.com/V4/manager/Managerhomepage.php");
  }) */

/*   it("Should validate the amount field as required", function () {
    let alertedMessage = "";
    cy.visit("http://demo.guru99.com/V4/index.php");
    cy.get("input[type='text']")
      .type(this.admin.UserID)
      .should("have.value", this.admin.UserID);
    cy.get("input[type='password']")
      .type(this.admin.Password)
      .should("have.value", this.admin.Password);
    cy.get("form").submit();
    cy.visit("http://demo.guru99.com/V4/manager/DepositInput.php");
    cy.get("input[name='accountno']")
      .type(this.deposit.accountNo)
      .should("have.value", this.deposit.accountNo);
    cy.get("input[name='desc']")
      .type(this.deposit.description)
      .should("have.value", this.deposit.description);
    cy.on('window:alert', msg => alertedMessage = msg);
    cy.get("input[name='AccSubmit']")
      .click()
      .then(() => {
        expect(alertedMessage).to.match(/Please fill all fields/);
      })
  }) */

  it("Should add the deposit amount before submitted", async function () {
    let customerId = 0;
    cy.visit("http://demo.guru99.com/V4/index.php");
    cy.get("input[type='text']")
      .type(this.admin.UserID)
      .should("have.value", this.admin.UserID);
    cy.get("input[type='password']")
      .type(this.admin.Password)
      .should("have.value", this.admin.Password);
    cy.get("form").submit();
    cy.visit("http://demo.guru99.com/V4/manager/addcustomerpage.php");
    cy.get("input[name='name']")
      .type(this.customer.customerName)
      .should("have.value", this.customer.customerName);
    cy.get(`input[value='${this.customer.gender}']`)
      .check()
      .should("be.checked");
    cy.get("input[name='dob']")
      .type(this.customer.birthDate)
      .should("have.value", this.customer.birthDate);
    cy.get("textarea[name='addr']")
      .type(this.customer.address)
      .should("have.value", this.customer.address);
    cy.get("input[name='city']")
      .type(this.customer.city)
      .should("have.value", this.customer.city);
    cy.get("input[name='state']")
      .type(this.customer.state)
      .should("have.value", this.customer.state);
    cy.get("input[name='pinno']")
      .type(this.customer.pin)
      .should("have.value", this.customer.pin);
    cy.get("input[name='telephoneno']")
      .type(this.customer.mobileNumber)
      .should("have.value", this.customer.mobileNumber);
    cy.get("input[name='emailid']")
      .type(this.customer.email)
      .should("have.value", this.customer.email);
    cy.get("input[name='password']")
      .type(this.customer.password)
      .should("have.value", this.customer.password);
    cy.get("form[name='addcust']").submit();
      customerId = cy.get('tbody > tr:nth-child(4) > td:nth-child(2)').invoke("text").then(value => {
      customerId = value
      cy.visit("http://demo.guru99.com/V4/manager/addAccount.php");
      cy.get("input[name='cusid']")
      .type(customerId)
      .should("have.value", customerId);
      cy.get("select[name='selaccount']").select(this.basicAccount.accountType).should("have.value", this.basicAccount.accountType);
    });

  })
})

