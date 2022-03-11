let db;
const request = indexedDB.open("budget_tracker", 1);

// this event will emit if the database version changes 
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store called `new_budget`, set it to have an auto incrementing primary key 
    db.createObjectStore('new_budget', { autoIncrement: true });
  };
  
  // upon a successful
  request.onsuccess = function (event) {
    // when db is successfully created with its object store save reference and store to a global variable
    db = event.target.result;
  
    // check if app is online, if yes run checkDatabase function to send all local db data to api
    if (navigator.onLine) {
      uploadBudget();
    }
  };
  
  request.onerror = function (event) {
    console.log("Error: " + event.target.errorCode);
  };