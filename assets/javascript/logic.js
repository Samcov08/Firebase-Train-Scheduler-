const firebaseConfig = {
    apiKey: "AIzaSyB4PMidAE9IS5Dwt7tfwiNl41AOvLxuTS8",
    authDomain: "test-project-af383.firebaseapp.com",
    databaseURL: "https://test-project-af383.firebaseio.com",
    projectId: "test-project-af383",
    storageBucket: "",
    messagingSenderId: "230381466054",
    appId: "1:230381466054:web:707d62e802ca522582c2c7"
};


firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "hh:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#train-time").val("");
    $("#train-freq").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    // train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var trainTimePretty = moment.unix(trainTime).format("hh:mm");

    var trainDiff = moment().diff(moment(trainTime, "X"), "dest");
    console.log(trainDiff);

    var trainFreq = trainTime * trainDest;
    console.log(trainFreq);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );


    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});