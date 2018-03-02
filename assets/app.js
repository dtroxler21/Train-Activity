// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMyCHVnUVvanSquGD6tZHq1ajc-TpaCFk",
    authDomain: "train-7707c.firebaseapp.com",
    databaseURL: "https://train-7707c.firebaseio.com",
    projectId: "train-7707c",
    storageBucket: "train-7707c.appspot.com",
    messagingSenderId: "688712147615"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm");
  var frequency = $("#frequency-input").val().trim();

  // Uploads employee data to the database
  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrain,
    frequency: frequency 
  });

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
  var frequency = parseInt(childSnapshot.val().frequency);

  // console.log info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(frequency);

  // Push first time back a year so that it is before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  // Difference in time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in Time: " + diffTime);

  // Finding remainder to be used to calculate minutesAway
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minutes Away
  var minutesAway = frequency - tRemainder;
  console.log("Minutes Away: " + minutesAway);

  // Next train time
  var nextArrival = moment().add(minutesAway, "minutes");
  console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));

  // Add each train's data into table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
