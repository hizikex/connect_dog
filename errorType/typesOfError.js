//1. SYNTAX ERROR
// const sum = (a, b) => {

//result    SyntaxError: Unexpected end of input


// 2. TYPE ERROR
//This error occurs when we called a method that is not available to a datatype.
//Say, when a value is used outside the scope of that datatype.
let num = 13;
// console.log(num.split(""));

// 3. REFERENCE ERROR:
//This occurs when we try to access a variable that has no instance or haven't been declared.
const person = {
    name: "John",
    age: 30
};
// console.log(sex);

// // 4. RANGE ERROR
// // This occurs when we set a condition and we are are expecting a value within a certain range.
// So any value outside this range will throw this error.
const checkRange = (num)=>{
    if (num < 30) throw new RangeError("Wrong number");
    return true
  }
  
  console.log(checkRange(20));
  