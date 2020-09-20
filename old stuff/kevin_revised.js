//declare global variables

var a=5; b=3; c=4; d=2;
var aa=a+b; 
var bb=c/d;
var cc=aa*bb;

console.log("\n");
console.log("Transaction Management\n");
let maxNumTries = 3;   // number of tries to attempt each part
// transactions to be attempted in sequential order
let transactions = [
  //calculateTotal,
  updateCouponUsage,
  chargeVendorProcessingFee,
  chargeCreditCard
];
// rollbacks to be performed in case transaction fails
let rollbacks = [
  //rollbackCalculateTotal,
  rollbackUpdateCouponUsage,
  rollbackChargeVendorProcessingFee,
  rollbackChargeCreditCard
];
// flag advises success of complete transaction
let flag = completeTransactions(transactions, rollbacks, maxNumTries);
console.log("\n");
console.log("Transaction Finished: Succeed = " + flag);
console.log("\n");

// method to attempt an entire list of transactions
function completeTransactions(transactions, rollbacks, maxNumTries) {
  let flag = null;     // flag advises success of complete transaction
  let rollbackList = []; // rollback list for transactions that succeeded
  for(i=0; i<transactions.length; i++) {
    var count2 = i;
    flag = attemptTransaction( transactions[i], maxNumTries, count2);
    if (flag==false) { break; }
    else {rollbackList.push(rollbacks[i])
           
    };

      // do not rollback "calculate total"
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
function attemptTransaction(f, attempts, k) {
  let mm =[aa,bb,cc]; 
  let flag = false;    // ultimate success or failure of transaction
  let count = 0;       // count of attempts beginning at 0
  do {
    flag = f(count);   // attempt the transaction, let it know what attempt this is
    

    if (flag == true) {process.stdout.write(" Succeeded: ") 
       
    }
            
    else process.stdout.write(" Failed ");

    count++;           // increment count of attempts
    // if failed & still more tries remaining, execute Retry() delay
    if (flag == false && count<attempts) {
      process.stdout.write("... ");
      retry();
    }
  } while (flag == false && count<attempts);
  // transaction completed
  
  if (flag==true) console.log(mm[k]);
   
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


function updateCouponUsage(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Update Coupon... ");
  }

  return randomSuccess();

}
function rollbackUpdateCouponUsage() {
  var xx = a.toString()+ "+" + b.toString();
  console.log("\n");
  console.log("Rolled Back Coupon Update: " +xx);
  return true;
}

function chargeVendorProcessingFee(attempt) {
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Charge Vendor Processing Fee... ");
  }
  return randomSuccess();
}
function rollbackChargeVendorProcessingFee() {
  var yy = c.toString()+ "/" + d.toString();
  console.log("\n");
  console.log("Rolled Back Charge of Vendor Processing Fee. " +yy);
 // console.log("Rolled Back Charge of Vendor Processing Fee.");
  return true;
}

function chargeCreditCard(attempt) {
 
  if (attempt==0) {    // first try
    process.stdout.write("Attempting to Charge Credit Card... ");
  }
  return randomSuccess();
}
function rollbackChargeCreditCard() {
  var zz = aa.toString()+ "/" + bb.toString();
  console.log("\n");
  console.log("Rolled Back Charge to Credit Card: " +zz);
  return true;
}

function randomSuccess() {
  return (Math.random() < .5);
}