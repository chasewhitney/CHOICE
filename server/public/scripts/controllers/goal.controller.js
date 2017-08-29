myApp.controller('GoalController', function(UserService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.clientData = [];
  vm.jobSiteData = [];
  vm.casemanagerData = [];
  var goal = {};

  //DATA OBJECT TO SEND TO SERVER-SIDE
  // var goal = {
  //   client_id: client_id,
  //   jobsite_id: jobsite_id,
  //   implementation_date: implementation_date,
  //   review_dates: review_dates,
  //   completion_date: completion_date,
  //   service_outcome: service_outcome,
  //   objective: objective,
  //   behavior_technique: behavior_technique,
  //   modifications: modifications,
  //   equipment: equipment,
  //   when_notes: when_notes,
  //   plan_steps: plan_steps
  // };

// GET REQUEST TO RETIEVE CLIENT NAMES AND IDs fROM DB TO POPULATE PULLDOWN MENU / AUTOCOMPLETE
// Route: /goal/clients
function getClients() {
  $http.get('/goal/clients').then(function(response) {
    console.log("clients response:", response.data);
    vm.clientData = response.data;
  });
}
getClients();
//CONVERT CLIENT NAME TO CLIENT ID
vm.assignClientID = function (id){
  console.log("assignClient id: ", id);
  goal.client_id = id;
};

// GET REQUEST TO RETIEVE CASE MANAGER NAMES AND IDs fROM DB TO POPULATE PULLDOWN MENU / AUTOCOMPLETE
// Route: /goal/casemanager

function getCaseManagers() {
  $http.get('/goal/casemanager').then(function(response) {
    console.log("case managers response: ", response.data);
    vm.casemanagerData = response.data;
  });
}
getCaseManagers();
//CONVERT CLIENT NAME TO STAFF ID
vm.assignCMID = function (id) {
  console.log("assignClient id: ", id);
  goal.casemanager_id = id;
};

// GET REQUEST TO RETIEVE JOB SITE NAMES AND IDs fROM DB TO POPULATE PULLDOWN MENU / AUTOCOMPLETE
// Route: /goal/jobsites
function getJobSites() {
  $http.get('/goal/jobsites').then(function(response) {
    console.log("Job Site response:", response.data);
    vm.jobSiteData = response.data;
  });
}
getJobSites();
//CONVERT JOB NAME TO JOBSITE ID
vm.assignJobsiteId = function (id){
  console.log("assignJobsiteId id: ", id);
  goal.jobsite_id = id;
};

// POST NEW CRITERIA TO THE DB

// RETRIVE GOAL CRITERIA DATA FROM DOM
vm.saveCriteria = function(implementation_date, review_dates, completion_date,
  service_outcome, objective, behavior_technique, modifications, equipment,
  when_notes, plan_steps) {
    goal.implementation_date = implementation_date;
    goal.review_dates = review_dates;
    goal.completion_date = completion_date;
    goal.service_outcome = service_outcome;
    goal.objective = objective;
    goal.behavior_technique = behavior_technique;
    goal.modifications = modifications;
    goal.equipment = equipment;
    goal.when_notes = when_notes;
    goal.plan_steps = plan_steps;
    console.log("goal: ", goal);

    $http.post('/goal', goal).then(function(response) {
      console.log('sending goal data to db: ');
      if (response) {
        console.log('server sent something back: ', response);
      }
    });
};
// GET SINGLE CRITERIA FROM THE DB BASED ON GOAL_ID


// UPDATE SINGEL CRITERIA IN DB USING GOAL_ID


// "DELETE" CRITERIA BY CHANGING GOAL_STATUS TO FALSE & DISABLING IT





}); //end of controller