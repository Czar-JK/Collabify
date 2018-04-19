var myLowTasks = new Array();
var myMediumTasks = new Array();
var myHighTasks = new Array();

var totalTasksMade = 0;

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
    this.id = "dragL" + myLowTasks.length;
  } else if (prio == 1) {
    myMediumTasks.push(this);
    this.id = "dragM" + myMediumTasks.length;
  } else {
    myHighTasks.push(this);
    this.id = "dragH" + myHighTasks.length;
  }
}

function displayLowTask(task){

  var d = new Date(task.date);

  $( "#" + task.id + " #lowHeader h1" )
    .html(task.name);
  $( "#" + task.id + " #lowBar" ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #lowBar" )
    .html(task.percentage + "%");
  $( "#" + task.id + " #lowFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

function displayMediumTask(task){

  var d = new Date(task.date);

  $( "#" + task.id + " #medHeader h1" )
    .html(task.name);
  $( "#" + task.id + " #medBar" ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #medBar" )
    .html(task.percentage + "%");
  $( "#" + task.id + " #medFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

 function displayHighTask(task){

  var d = new Date(task.date);

  $( "#" + task.id + " #highHeader h1" )
    .html(task.name);
  $( "#" + task.id + " #highBar" ).css({"width": parseInt(task.percentage) + "%"});
  $( "#" + task.id + " #highBar" )
    .html(task.percentage + "%");
  $( "#" + task.id + " #higFooter h5" )
    .html("<strong>" + task.assigned + "</strong>  " + d.toDateString() );
 }

function move() {
  var elem = document.getElementById("myBar");   
  var width = 20; //starting width
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) { //ending width
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}



