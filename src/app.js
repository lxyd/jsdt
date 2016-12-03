define(['./model'], function(model) {
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