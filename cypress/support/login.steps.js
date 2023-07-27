const { Then, Given } = require('@badeball/cypress-cucumber-preprocessor');
import { LoginPage } from '..support/page_objects/login_page.js' 

// Variables
const login = new LoginPage();

//Given methods (Actions) - In which state app should be
Given(/^I am on the login page$/, function () {
    login.openLoginPage();
});

Given(/^I enter the username "(.*)$/, function (username) {
    login.enterUsername(username);
});

Given(/^I enter the password "(.*)$/, function (password) {
    login.enterUsername(password);
});

Given(/^I press submit button $/, function (password) {
    login.clickOnSubmit();
});

//THEN methods (Assertions)
Then(/^Verify that we login in application$/, function () {
    login.verifyLogin().should('contain', '');
});