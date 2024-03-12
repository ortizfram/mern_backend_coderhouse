// you can use it as setTimeout for e.g to reset and restart counter
// common usage: for completing a credit Card payment of a buy
let counter = 0;

const timer = setInterval(() => {
  counter++;
  console.log("Counter:", counter);

  if (counter >= 5) {
    clearInterval(timer); // Stop the interval after 5 seconds
    console.log("Counter stopped after 5 seconds");
  }
}, 1000); // Run every second (1000 milliseconds)

// Using setTimeout to stop the interval after 5 seconds
setTimeout(() => {
  clearInterval(timer);
}, 5000); // Stop the interval after 5 seconds
