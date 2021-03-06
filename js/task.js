var myLowTasks = new Array();
var myMediumTasks = new Array();
var myHighTasks = new Array();

var totalLowTasksMade = 1;
var totalMedTasksMade = 1;
var totalHighTasksMade = 1;

var task ={
  name: "taskName",
  percentage: 0,
  priority: 0,
  assigned: "worker",
  id: 0,
  date: 000000,
  catagory: null
} ;

function Task(name, percent, prio, assigned){
  this.name = name;
  this.percentage = percent;
  this.priority = prio;
  this.assigned = assigned;
  this.date = Date.now();

  this.catagory = null;
  
  if(prio == 0){
    myLowTasks.push(this);
    //writeLowUserTask(percent, name);
    this.id = "dragL" + totalLowTasksMade;
	totalLowTasksMade++;
  } else if (prio == 1) {
    myMediumTasks.push(this);
    //writeMedUserTask(this.percentage, this.name);
    this.id = "dragM" + totalMedTasksMade;
	totalMedTasksMade++;
  } else {
    myHighTasks.push(this);
    //writeHighUserTask(this.percentage, this.name);
    this.id = "dragH" + totalHighTasksMade;
	totalHighTasksMade++;
  }
}

function displayLowTask(task){

  var d = new Date(task.date); //reads miliseconds to dates

  $( "#" + task.id + " #lowHeader button" ).attr("id", "delete-"+task.id);
  $( "#" + task.id + " #lowHeader a" ).attr("id", "show-"+task.id);
  $( "#" + task.id + " #collapseLow0 div button" ).attr("id", "complete-"+task.id);
  $( "#" + task.id + " #collapseLow0 #Bar" ).attr("id", "Bar"+task.id);
  $( "#" + task.id + " #collapseLow0").attr("id", "collapse"+task.id);

  $( "#" + task.id + " #lowHeader h1" )
    .html("<strong>" + task.name + "</strong>");
  $( "#" + task.id + " #Bar"+task.id ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #Bar"+task.id )
    .html(task.percentage + "%");
  $( "#" + task.id + " #lowFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

function displayMediumTask(task){

  var d = new Date(task.date);

  $( "#" + task.id + " #medHeader button" ).attr("id", "delete-"+task.id);
  $( "#" + task.id + " #medHeader a" ).attr("id", "show-"+task.id);
  $( "#" + task.id + " #collapseMed0 div button" ).attr("id", "complete-"+task.id);
  $( "#" + task.id + " #collapseMed0 #Bar" ).attr("id", "Bar"+task.id);
  $( "#" + task.id + " #collapseMed0").attr("id", "collapse"+task.id);

  $( "#" + task.id + " #medHeader h1" )
    .html("<strong>" + task.name + "</strong>");
  $( "#" + task.id + " #Bar"+task.id ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #Bar"+task.id )
    .html(task.percentage + "%");
  $( "#" + task.id + " #medFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

 function displayHighTask(task){

  var d = new Date(task.date);

  $( "#" + task.id + " #highHeader button" ).attr("id", "delete-"+task.id);
  $( "#" + task.id + " #highHeader a" ).attr("id", "show-"+task.id);
  $( "#" + task.id + " #collapseHigh0 div button" ).attr("id", "complete-"+task.id);
  $( "#" + task.id + " #collapseHigh0 #Bar" ).attr("id", "Bar"+task.id);
  $( "#" + task.id + " #collapseHigh0").attr("id", "collapse"+task.id);


  $( "#" + task.id + " #highHeader h1" )
    .html("<strong>" + task.name + "</strong>");
  $( "#" + task.id + " #Bar"+task.id ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #Bar"+task.id )
    .html(task.percentage + "%");
  $( "#" + task.id + " #highFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

function move(id) {
  var parsedID = id.slice(13); //seperates ID into usable parts
  var parsedPrio = parsedID.slice(0,1);
  var parsedIDNum = parsedID.slice(1);

  var elem = document.getElementById("Bardrag"+parsedID);
  if(elem.textContent.slice(1,2) == '%'){
    var width = elem.textContent.slice(0,1);

    var ids = setInterval(frame, 10);

    function frame() {
      if (width >= 100) { //ending width
        clearInterval(ids);
      } else {
        width++; 
        elem.style.width = width + '%'; 
        elem.innerHTML = width * 1  + '%';
      }
    }
  } else {
    if(elem.textContent != "100%" && elem.textContent != "0%"){
      var width = elem.textContent.slice(0,2); //starting width

      var ids = setInterval(frame, 10);
      function frame() {
        if (width >= 100) { //ending width
          clearInterval(ids);
        } else {
          width++; 
          elem.style.width = width + '%'; 
          elem.innerHTML = width * 1  + '%';
        }
      }
    } else if (elem.textContent == "0%"){
      var width = elem.textContent.slice(0,1); 

      var ids = setInterval(frame, 10);
      function frame() {
        if (width >= 100) { //ending width
          clearInterval(ids);
        } else {
          width++; 
          elem.style.width = width + '%'; 
          elem.innerHTML = width * 1  + '%';
        }
      }
    }
  }
}

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUI53GZ6IXzu957lBR-WWfmgEPNj-Nd8c",
    authDomain: "collabify-us.firebaseapp.com",
    databaseURL: "https://collabify-us.firebaseio.com",
    projectId: "collabify-us",
    storageBucket: "collabify-us.appspot.com",
    messagingSenderId: "458971277153"
  };
  firebase.initializeApp(config);

 var dB = firebase.database();


//var LowTaskCompleted = 5000;
//var LowTaskName = "Name";

//writeUserData(TaskName, TaskCompleted);



 function writeLowUserTask(LowTaskCompleted, LowTaskName) {
  firebase.database().ref('Tasks/LowTasks/').set({
    taskName: LowTaskName,
    taskCompleted: LowTaskCompleted,
    
    });
  console.log("Write to database successful - Low");
}

 function writeMedUserTask(MedTaskCompleted, MedTaskName) {
  firebase.database().ref('Tasks/MedTasks/').set({
    taskName: MedTaskName,
    taskCompleted: MedTaskCompleted,
    
    });
  console.log("Write to database successful - Med");
}

 function writeHighUserTask(HighTaskCompleted, HighTaskName) {
  firebase.database().ref('Tasks/HighTasks/').set({
    taskName: HighTaskName,
    taskCompleted: HighTaskCompleted,
    
    });
  console.log("Write to database successful - High");
}

/*var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/Tasks/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  return username;
});*/

// Test for the existence of certain keys within a DataSnapshot
var ref = firebase.database().ref("users/ada");
ref.once("value")
  .then(function(snapshot) {
    var percentCompleted = snapshot.child("LowTasks/percentCompleted").val(); // "Ada"
    var lastName = snapshot.child("LowTasks").child("taskName").val(); // "Lovelace"
    
  });

