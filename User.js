class User {
    constructor(username, password){
        this.id = this.generateId();
        this.username = username;
        this.password = password;
    }

    // generates unique ID for user
    generateId(){
        return "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    }

    //checks whether password entered during login matches user's password
     validatePassword(password) {
        return this.password === password;
    }

   toJSON() {
        return {
            id: this.id,
            username: this.username,
            password: this.password   // saves username and password in JSON format
        };
    }
}