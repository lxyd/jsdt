define([/* no dependencies yet */], function() {
    
    
    if ( !(window.File && window.FileReader && window.FileList && window.Blob) ){
        //TODO: error handler and don`t humiliate user anymore...
        alert("What the fuck with ur browser? UPDATE IT SONOFABITH!!!!");
    }
    
    var control = document.getElementById("userInputFile");
    var userObj;
    
    control.addEventListener("change", function (event) {
        var userFile = control.files[0];

        reader = new FileReader();
        reader.readAsText(userFile);
        
        reader.onload = function(evt) {
            window.userObj = JSON.parse(evt.target.result);
            
        };
        
        reader.onerror = function(evt) {
            //TODO: error handler
            alert("SOME ERROR WHILE READING JSON!!!");
        };
    });

});