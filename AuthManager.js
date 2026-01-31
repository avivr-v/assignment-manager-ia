class AuthManager{
    constructor() {
    // loads stored users from localStorage 
    const stored = JSON.parse(localStorage.getItem("users")) || [];

    // convert plain objects back into User instances and preserves their IDs 
    this.users = stored.map(function(u) {
        const userObj = new User(u.username, u.password);
        userObj.id = u.id; // keep the same ID
        return userObj;
    });

    // tracks the currently logged-in user ID 
    this.currentUserId = null;
}


    // checks if user already exists
    userExists(username) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                return true;
            }
        }
        return false;
    }

    // signups a new user
    signUp(username, password){
        const errorMessage = document.getElementById("errorMessage");
        
        if (this.userExists(username)){
            errorMessage.textContent = "Username already exists.";
            return false;
        }

        const newUser = new User(username, password);
        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users)); 
        
        return true;
    }

    // logins user
    login(username, password){
        const errorMessage = document.getElementById("errorMessage");
        let user = null;

        // search through user array
        for (let i = 0; i < this.users.length; i++){
            if (this.users[i].username === username) {
                user = this.users[i];
                break;
            }
        }

        // error handling
        if(!user || !user.validatePassword(password)){
            errorMessage.textContent = "Username or password are incorrect.";
            return false;
        }

        // login successful
        this.currentUserId = user.id;
        localStorage.setItem("currentUserId", user.id);
        
        return true;
    }
}