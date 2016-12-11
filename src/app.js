define(['./model'], function(model) {
    "use strict";
    class App {
        constructor() {
        }
        
        start() {
            console.log(model);
            alert("It's working!");
        }
    }
    return App;
});