/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*

* 1. Window binding is attaching the 'this' keyword to reference the global object, window.

* 2. Implicit binding is referencing the parent object through it's own properties (ie. this.name).

* 3. Explicit binding is the direct referencing to an object '____._property_' or overriding the call/apply/bind with another object name.

* 4. New binding is the reference of creating a new object that then copies the properties referencing itself though it's properties using 'this.____'.

*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
this.name = 'Zeus';
// console.log(window.name);

// Principle 2

// code example for Implicit Binding
const person = el => {
  el.talk = function() {
    console.log(`Hi there. My name is ${this.name} and I am from ${this.location}`);
    // console.log(this);
  };
}

const shawn = {
  name: 'Shawn',
  location: 'Lake Havasu City' 
};

person(shawn);

shawn.talk();


// Principle 3

// code example for New Binding
function Animal(name, weight) {
  this.name = name;
  this.weight = weight; //lbs
  this.describe = function() {
    console.log(`My species is ${name} and our average weight is ${weight} lbs.`);
  }
}

const cheetah = new Animal('cheetah', 294);

cheetah.describe();

// Principle 4

// code example for Explicit Binding