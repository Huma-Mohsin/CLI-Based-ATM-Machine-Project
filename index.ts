#!/usr/bin/env node
import inquirer from "inquirer"; //import inquire and chalk modules.
import chalk from "chalk";
//let assumed that some information of a customer is stored in its database at backend.i.e
let PresentBalance = 15000000; //values in Rupees
let PinCode = 9821;
let InsertATM = true; // Removed type declaration as it's not necessary here
let deposit = 0;
let Withdrawl = 0;
//display message appearss on atm screen before any transaction.
console.log(chalk.greenBright("WELCOME"));
console.log(chalk.blueBright("Please Enter Your Card To Begin"));
//when person enters his atm card, system can ask him/her about his/her pincode.
let answers = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.magenta("Enter Your 4-DIGIT Pin Code  "),
  },
]);
//we apply logic here that what happened if customer enters a pin code whether pin code is correct or incorrect.

//if customer enters correct pincode then condition checks at if, and then ultimately user is allowed to perform some actions inorder to make transactions.

//PARENT IF:-
if (InsertATM && answers.pin === PinCode) {
  // Changed "PinCode" to PinCode()//resolve my 1st error.

  console.log(chalk.greenBright("WELCOME"));

  let correctpin = await inquirer.prompt([
    {
      name: "actions",
      type: "list",
      message: chalk.yellow("Please Select The Transaction"),
      choices: [
        "Account Information",

        "Deposit",
        "Pin Change",
        "Balance",
        "Withdrawl",
        "Fast Cash",
        "Bill Payment",
      ],
    },
  ]);

  if (correctpin.actions === "Account Information") {
    function customerinformation() {
      let person_info = {
        CustomerName: "Huma Mohsin",
        CNIC: "12345-456-789",
        CardType: "Debit Card",
        AccountInformation: "0133-1236789456",
        IBAN: "PK40MEZN0000001123456702",
      };
      return person_info;
    }
    console.log(customerinformation());
  } else if (correctpin.actions === "Deposit") {
    // Changed "deposit" to "Deposit"..my 2nd error resolve here.

    let depositamount = await inquirer.prompt([
      {
        name: "deposit",
        type: "number",
        message: chalk.magenta("Enter the amount which you want to Deposit?"),
      },
    ]);
    PresentBalance += depositamount.deposit; //update present balance such that it adds deposited amount init.
    console.log(
      chalk.green(`Cash Deposited ,Your Balance is: ${PresentBalance}`)
    ); //homework given to use string interpolation.
  } else if (correctpin.actions === "Pin Change") {
    //console.log("Enter your previous 4 Digit Pin Code");
    let pinchange = await inquirer.prompt([
      {
        name: "pin",
        type: "number",
        message: chalk.blue("Enter your previous 4 Digit Pin Code"),
      },
    ]);
    if (pinchange.pin === PinCode) {
      //console.log(chalk.magenta("Enter New 4 Digit Pin Code"));
      let new_pin = await inquirer.prompt([
        {
          name: "newpin",
          type: "number",
          message: chalk.magenta("Enter New 4 Digit Pin Code"),
        },
      ]);
      PinCode = parseInt(new_pin.pin); //updated new pin.previous pin change into new password however it is not updated here

      console.log(chalk.green("PIN successfully changed!"));
    } else {
      console.log(chalk.redBright("Pin Code Does Not Match, Try Again"));
    }
  } else if (correctpin.actions === "Balance") {
    console.log(chalk.greenBright(`Your Current Balance: ${PresentBalance}`));
  } else if (correctpin.actions === "Withdrawl") {
    let withdraw = await inquirer.prompt([
      {
        name: "withdraw_money",
        type: "number",
        message: chalk.yellowBright(
          "Enter The Amount Which You Want To Withdraw"
        ),
      },
    ]);

    let amountToWithdraw = withdraw.withdraw_money; // Get the amount to withdraw from user input

    // Ensure the amount to withdraw is not more than the present balance
    if (amountToWithdraw <= PresentBalance) {
      Withdrawl += amountToWithdraw; // Update total withdrawal amount

      let remainingBalance = PresentBalance - Withdrawl; // Calculate remaining balance
      console.log(chalk.green(`Your Remaining Balance is ${remainingBalance}`)); // Display remaining balance
    } else {
      console.log(chalk.redBright("Insufficient Amount!")); // Display message if withdrawal amount exceeds present balance
    }
  }

  //homework
  else if (correctpin.actions === "Fast Cash") {
    //asking user to withdraw amount,This option helps to withdraw money faster,in this operation we have some amount of predefined money options and user have to select and instantly withdraw money.
    //System asks from user to which amount do you want fastcash
    let fastcash = await inquirer.prompt([
      {
        name: "f_cash",
        type: "list",
        message: "Select Amount",
        choices: ["1000", "15000", "25000", "40000", "Other"],
      },
    ]);
    PresentBalance -= parseInt(fastcash.f_cash); // Converted fastcash.f_cash to integer (3rd error resolve here)
    console.log(
      chalk.redBright(
        `You Withdraw Money As Fast Cash, Successfully ${fastcash.f_cash}`
      )
    );
    console.log(
      chalk.green(`Now, your Remaining Balance is ${PresentBalance}`)
    );
  } else if (correctpin.actions === "Bill Payment") {
    let billpay = await inquirer.prompt([
      {
        name: "Utility Bills",
        type: "list",
        message: chalk.magentaBright("Select Your Bill Here"),
        choices: [
          "Water & Sewerages",
          "Institutional Payments",
          "Internet Service Providers",
          "Telephones/Mobiles",
          "Electricity",
          "Gas",
        ],
      },
    ]);
    if (billpay["Utility Bills"]) {
      // Changed condition to check property of billpay,4th error resolve here
      let consumerName = billpay["Utility Bills"]; // Corrected the variable assignment,5th error resolve here.
      console.log(chalk.green("Enter your Consumer Number"));
      if (consumerName === "Water & Sewerages") {
        // Changed "=" to "===",6th error resolve here
        function consumerdetails() {
          let person = {
            //returns object
            Name: "HUMA MOHSIN",
            BillNumber: 45123698745,
            Duedate: "27-3-24", // Enclosed date in quotes
            Status: "Unpaid",
            Amount: 15000,
            Pay: true,
          };
          console.log(person);
        }
        //console.log(chalk.magenta(consumerdetails()));
        consumerdetails();
      } else {
        console.log(chalk.red("Incorrect consumer Number"));
      }
    }
  }
} //PARENT IF CLOSE HERE
else {
  //PARENT ELSE
  console.log(chalk.red("Pin Is Incorrect."));
  console.log(
    chalk.bgYellow.redBright("Please Enter Your Correct 4-Digit PinCode")
  );
}
//Author-HUMA MOHSIN
