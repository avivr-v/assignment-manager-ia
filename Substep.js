class Substep extends Assignment {
    constructor(name, description = "", details, parentId){
        super(name);
        this.description = description;
        this.parentId = parentId // reference to parent Assignment
        this.details = details;
        //overriding properties that don't apply to substeps
        this.subject = "";
        this.deadline = null; 
        this.priority = "";
        this.substeps = [];
    }

    // override generateId to indicate it's a substep
    generateId(){
        return "substep_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    }

    // override to prevent infinite nesting - substeps cannot have substeps
    hasSubsteps(){
        return false;
    }

    // override addSubstep - substeps cannot have substeps
    addSubstep(substep){
        return false;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
}