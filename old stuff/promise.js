
function rollbackUpdateCouponUsage(){
  console.log(" 'couponUsage rolled back' ");
};

function rollbackChargeVendorProcessingFee(){
  console.log(" 'vendorFeeCharge rolled back' ");
};

function rollbackChargeCreditCard(){
  console.log(" creditcardCharge rolled back' ");
};

function calculateTotal(){
  console.log(" 'calculateTotal done' ");
};

  let UpdateCouponUsage = () => {
    return new Promise((resolve, reject) => {
  let couponUsageUpdated = Math.random() < 0.5;
  if(couponUsageUpdated){
    resolve(" 'coupon updated' ");
  } else {
    reject(" 'couponUpdate failed' ");
    
  }
});
}; 

let ChargeVendorProcessingFee = (message) => {
  return new Promise((resolve, reject) => {
  let vendorProcessingFeeCharged = Math.random() < 0.5;
  if(vendorProcessingFeeCharged){
    resolve(message + " 'vendorFee charged' ");
  } else {
    reject(message + " 'vendorFeeCharge failed' ");
    rollbackUpdateCouponUsage();
   
  }
});
};

let ChargeCreditCard = (message) => {
  return new Promise((resolve, reject) => {
  let creditCardCharged = Math.random() < 0.5;
  if(creditCardCharged){
    resolve(message + " 'creditCard charged' ");
  } else {
    reject(message + " 'creditCardCharge failed' ");
    rollbackUpdateCouponUsage();
    rollbackChargeVendorProcessingFee();
    
  }
});
};

function placeOrder(){
  calculateTotal();

  UpdateCouponUsage().then((result) => {
     return ChargeVendorProcessingFee(result);
  }).then((result) => {
    return ChargeCreditCard(result);
  }).then((result) => {
    console.log(result + " 'place-order is done successfully.'");
  }).catch(((result) => {
     console.log(result +" 'place-order has failed.' " );
  }))
}

placeOrder();
