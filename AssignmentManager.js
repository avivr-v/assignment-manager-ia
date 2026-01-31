class AssignmentManager {
    constructor(userId) {
        this.userId = userId;
        this.assignments = []; // array stores all assignments
        this.loadAssignments();
    }

    // loads user's assignments from localStorage
    loadAssignments() {
    var key = "assignments_" + this.userId;
    var storedAssignments = localStorage.getItem(key);

    if (storedAssignments) {
        var parsedAssignments = JSON.parse(storedAssignments);
        var currentAssignments = [];

        for (var i = 0; i < parsedAssignments.length; i++) {
            var data = parsedAssignments[i];
            currentAssignments.push(Assignment.fromJSON(data));
        }

        this.assignments = currentAssignments;
    }

    // removes 'no assignments' message if assignments exist
    if (this.assignments.length > 0) {
        var message = document.getElementById("todop");
        if (message) {
            message.remove();
        }
    }
}


    // saves user's assignments to localStorage
    saveAssignments(){
        var key = "assignments_" + this.userId; // user-specific key
        var assignmentsData = [];

        for (var i = 0; i < this.assignments.length; i++) {
            assignmentsData.push(this.assignments[i].toJSON());
        }

        localStorage.setItem(key, JSON.stringify(assignmentsData));
    }

}