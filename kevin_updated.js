// Class "CalculateTotal" calculates the total transaction amount.
// This class includes static methods execute() to perform the calculation,
// rollback() to rollback the calculation, retry(), and the static variable maxNumTries.
class CalculateTotal {
    static maxNumTries = 3;    // maximum number of retries for calculation
    static execute(attempt) {
        if (attempt==0) {      // first try
            process.stdout.write("Attempting to Calculate Total... ");
        }
        return randomSuccess();
    }
    static rollback() {
        console.log("Rolled Back Total Calculation.");
        return true;
    }
    static retry() {
        pause(3000);
    }
}
// Class "UpdateCouponUsage" is responsible for updating the coupon statuc database.
// This class includes static methods execute() to consume the coupon,
// rollback() to rollback the coupon, retry(), and the static variable maxNumTries.
class UpdateCouponUsage {
    static maxNumTries = 3;    // maximum number of retries for update coupon usage
    static execute(attempt) {
        if (attempt==0) {      // first try
            process.stdout.write("Attempting to Update Coupon... ");
        }
        return randomSuccess();
    }
    static rollback() {
        console.log("Rolled Back Coupon Update.");
        return true;
    }
    static retry() {
        pause(3000);
    }
}

// Class "ChargeVendorProcessingFee" is responsible for charging the vendor the processing fee.
// This class includes static methods execute() to execute the charge,
// rollback() to rollback the charge, retry(), and the static variable maxNumTries.
class ChargeVendorProcessingFee {
    static maxNumTries = 3;    // maximum number of retries for charge vendor processing fee
    static execute(attempt) {
        if (attempt==0) {      // first try
            process.stdout.write("Attempting to Charge Vendor Processing Fee... ");
        }
        return randomSuccess();
    }
    static rollback() {
        console.log("Rolled Back Charge of Vendor Processing Fee.");
        return true;
    }
    static retry() {
        pause(3000);
    }
}

// Class "ChargeCreditCard" is responsible for charging the customer's credit card.
// This class includes static methods execute() to execute the charge,
// rollback() to rollback the charge, retry(), and the static variable maxNumTries.
class ChargeCreditCard {
    static maxNumTries = 3;    // maximum number of retries for charge credit card
    static execute(attempt) {
        if (attempt==0) {      // first try
            process.stdout.write("Attempting to Charge Credit Card... ");
        }
        return randomSuccess();
    }
    static rollback() {
        console.log("Rolled Back Charge to Credit Card.");
        return true;
    }
    static retry() {
        pause(3000);
    }
}
// Transaction Management main routine.
console.log("Transaction Management\n");
// transactions to be attempted in sequential order (a list of classes each with static methods
// execute, rollback, retry, and static variable maxNumTries).
let transactions = [
  CalculateTotal,
  UpdateCouponUsage,
  ChargeVendorProcessingFee,
  ChargeCreditCard
];
// attempt and advise success of complete transaction
console.log("Transaction Finished: Succeed = " + completeTransactions(transactions) );

// method to attempt an entire list of transactions
function completeTransactions(transactions) {
    let rollbackQueue = [];    // rollback list for transactions that succeeded
    try {
        transactions.forEach( (transaction) => {
            if ( attemptTransaction(transaction) ) {
                rollbackQueue.push(transaction); // queue the successful transactions in case rollback is necessary
            } else {
                throw "Retry limit reached"; // transaction has failed
            }
        })
    }
    // error is thrown if the complete transaction failed,
    // roll back all individual transactions in reverse order.
    catch(err) {           
        rollbackQueue.reverse().forEach( (transaction) => {
            transaction.rollback(); // perform each rollback in reverse sequence
        })
        return false;          // transaction failed, return "false"
    }
    return true;               // transaction succeeded, return "true"
}

// method to attempt indivisible transaction
function attemptTransaction(transact) {
    let flag = null;           // ultimate success or failure of transaction
    let count = 0;             // count of attempts beginning at 0
    do {
        flag = transact.execute(count); // attempt the transaction, let it know what attempt number this is
        if (flag == true) process.stdout.write("Succeeded"); else process.stdout.write("Failed");
        count++;               // increment count of attempts
        // if failed & still more tries remaining, execute retry() function
        if (flag == false && count<transact.maxNumTries) {
            process.stdout.write("... ");
            transact.retry();
        }
    } while (flag == false && count<transact.maxNumTries);
    // transaction completed
    console.log(".");
    return flag;               // return ultimate status
}

function pause(milliseconds) { // javascript method to pause for a certain period of milliseconds
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function randomSuccess() {     // return equal chance of true or false representing success or failure
    return (Math.random() < .5);
}