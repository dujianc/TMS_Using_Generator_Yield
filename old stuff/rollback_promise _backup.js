//set global variables
var a=5; b=3; c=4; d=2; 
var aa; 
var bb; 

function rollbackAdd(a,b){
  var xx = a.toString()+ "+" + b.toString();
  console.log(" rollback add: "+ xx);
};

function rollbackDivide(a,b){
  var yy = a.toString()+ "/" + b.toString();
  console.log(" rollback divide: "+ yy);
};

function rollbackMultiply(a,b){
  var zz = a.toString()+ "*" + b.toString();
  console.log(" rollback multiply: "+ zz);
};

  let add = (a, b) => {
    return new Promise((resolve, reject) => {
  let flagAdd = Math.random() < 0.5;
//  let flagAdd = true;
  if(flagAdd){
    aa = a+b; 
    resolve();
    console.log(" add succeeds: " +aa);
    return aa;
  }     
   else {
   reject();
   console.log(" add fails ");
   //rollbackAdd(a,b) 
  }
});
}; 

let divide = (a,b, c,d) => {
  return new Promise((resolve, reject) => {
  let flagDivide = Math.random() < 0.5;
  //let flagDivide = true;
  if(flagDivide){
    bb = c/d;
    resolve();
    console.log(" divide succeeds: " +bb);
    return bb;
  } 
  else {
    reject();
    console.log(" divide fails ");
    //rollbackDivide(c,d);
    rollbackAdd(a,b);
  }
});
};

let multiply = (a,b,c,d) => {
  return new Promise((resolve, reject) => {
  let flagMultiply = Math.random() < 0.5;
  //let flagMultiply = false;
  if(flagMultiply){
    var cc = aa*bb;
    resolve();
    console.log(" multiply succeeds: "+cc);
    return cc;
  } 

  else {
    reject();
    console.log(" multiply fails " );
  //  rollbackMultiply(aa,bb);
    rollbackDivide(c,d);
    rollbackAdd(a,b);
   }
});
};

function rollbackExercise(){
   add(a,b).then(() => {
     return divide(a,b, c,d);
  }).then(() => {
    return multiply(a,b,c,d);
  }).then(() => {
    console.log(" rollback Exercise is done successfully.");
  }).catch((() => {
     console.log(" rollback Exercise has failed." );
  }))
}

rollbackExercise();
