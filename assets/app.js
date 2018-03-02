// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMyCHVnUVvanSquGD6tZHq1ajc-TpaCFk",
    authDomain: "train-7707c.firebaseapp.com",
    databaseURL: "https://train-7707c.firebaseio.com",
    projectId: "train-7707c",
    storageBucket: "",
    messagingSenderId: "688712147615"
  };

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = parseInt($("#frequency-input").val().trim());

  // "Temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrain,
    frequency: frequency 
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// Create event for adding train to the database and a row in the html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything in variables
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().fr;

  // console.log info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(frequency);

  // 
  var nextArrival = moment.unix(empStart).format("MM/DD/YY");

  // 
  var minutesAway = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Add each train's data into table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
