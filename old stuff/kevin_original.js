console.log("Transaction Management\n");
let maxNumTries = 3;   // number of tries to attempt each part
// transactions to be attempted in sequential order
let transactions = [
  calculateTotal,
  updateCouponUsage,
  chargeVendorProcessingFee,
  chargeCreditCard
];
// rollbacks to be performed in case transaction fails
let rollbacks = [
  rollbackCalculateTotal,
  rollbackUpdateCouponUsage,
  rollbackChargeVendorProcessingFee,
  rollbackChargeCreditCard
];
// flag advises success of complete transaction
let flag = completeTransactions(transactions, rollbacks, maxNumTries);
console.log("Transaction Finished: Succeed = " + flag);

// method to attempt an entire list of transactions
function completeTransactions(transactions, rollbacks, maxNumTries ) {
  let flag = null;     // flag advises success of complete transaction
  let rollbackList = []; // rollback list for transactions that succeeded
  for(i=0; i<transactions.length; i++) {
    flag = attemptTransaction( transactions[i], maxNumTries );
    if (flag==false) { break; }
    else {if (i != 0) rollbackList.push(rollbacks[i]); } // do not rollback "calculate total"
  }
  // check if the complete transaction failed, then
  // roll back all individual transactions in reverse order.
  if (flag == false) {
    for (i=rollbackList.length-1; i>=0; i--) {
      rollbackList[i]();  // perform each rollback in reverse sequence
    }
  }
  return flag;
}
// method to attempt indivisible transaction
function attemptTransaction(f, attempts) {
  let flag = false;    // ultimate success or failure of transaction
  let count = 0;       // count of attempts beginning at 0
  do {
    flag = f(count);   // attempt the transaction, let it know what attempt this is
    if (flag == true) process.stdout.write("Succeeded"); else process.stdout.write("Failed");
    count++;           // increment count of attempts
    // if failed & still more tries remaining, execute Retry() delay
    if (flag == false && count<attempts) {
      process.stdout.write("... ");
      retry();
    }
  } while (flag == false && count<attempts);
  // transaction completed
  console.log(".");
  return flag;         // return ultimate status
}

function retry() {
  // pause for 3 seconds
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < 3000);
}

function calculateTotal(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Calculate Total... ");
  }
  return randomSuccess();
}
function rollbackCalculateTotal() {
  console.log("Rolled Back Total Calculation.");
  return true;
}

function updateCouponUsage(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Update Coupon... ");
  }
  return randomSuccess();
}
function rollbackUpdateCouponUsage() {
  console.log("Rolled Back Coupon Update.");
  return true;
}

function chargeVendorProcessingFee(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Charge Vendor Processing Fee... ");
  }
  return randomSuccess();
}
function rollbackChargeVendorProcessingFee() {
  console.log("Rolled Back Charge of Vendor Processing Fee.");
  return true;
}

function chargeCreditCard(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Charge Credit Card... ");
  }
  return randomSuccess();
}
function rollbackChargeCreditCard() {
  console.log("Rolled Back Charge to Credit Card.");
  return true;
}

function randomSuccess() {
  return (Math.random() < .5);
}