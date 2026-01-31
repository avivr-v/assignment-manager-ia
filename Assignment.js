class Assignment{
    constructor(name, subject="", deadline=null, priority="medium", details=""){
        this.id = this.generateId();
        this.name = name; //only requiered field
        this.subject = subject;
        this.deadline = deadline; // format: dd/mm/yy
        this.priority = priority; // "low", "medium", or "high"
        this.details = details;
        this.hasSubsteps = false;
        this.completed = false;
        this.substeps = [] // stores reference to child substep objects
    }

    
    // generates unique ID for assignment to be used for deleting, editing etc
    generateId(){
        return "assignment_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    }

    // adds a substep to this assignment
    addSubstep(substep){
        this.substeps.push(substep);
    }

    // removes a substep by ID
    removeSubstep(substepId){
        this.substeps = this.substeps.filter(substep => substep.id !== substepId)
    }

    // checks if assignment has substeps
    hasSubsteps(){
        return this.substeps.length > 0;
    }

    // toggles completion status of Assignment 
    toggleComplete(){
        this.completed = !this.completed;
    }

    // checks if all substeps are complete
    areAllSubstepsComplete(){
        if(!this.hasSubsteps()){
            return false;
        }
        for(let i = 0; i < this.substeps.length; i++){
            if(!this.substeps[i].completed){
                return false;
            }
        }
        return true;
    }

    // auto-toggles completion status if all substeps are complete
    checkAutoComplete(){
        if(this.areAllSubstepsComplete()){
            this.completed = true;
            return true;
        }
        return false;
    }

    // checks if priority entered is "low", "medium", or "high"
    checkPriority(){
        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(this.priority)){
            return "Please enter either 'low', 'medium', or 'high' in this field"
        }
    }

    // parses deadline from dd/mm/yy format to Date object
    parseDeadline(){
        if(!this.deadline){
            return null;
        }
        const parts = this.deadline.split('/');
        if(parts.length !== 3){
            return null;
        }
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(day, month, year);
    }
    
    // update assignment details
    editAssignment(){
        
    }

    // convert Assignment to JSON for storage
    toJSON(){
        return {
            id: this.id,
            name: this.name,
            subject: this.subject,
            deadline: this.deadline,
            priority: this.priority,
            details: this.details,
            substeps: this.substeps.map(substep => substep.toJSON()),
            completed: this.completed,
            dateCreated: this.dateCreated
        };
    }

    // converts JSON to Assignment when loading from storage
    static fromJSON(data) {
    var a = new Assignment(
        data.name,
        data.subject,
        data.deadline,
        data.priority,
        data.details
    );

    a.id = data.id;
    a.completed = data.completed || false;
    a.substeps = data.substeps ? data.substeps.map(s => Substep.fromJSON(s)) : [];

    return a;
}

} 