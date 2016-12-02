define([/* no dependencies yet */], function() {
    
    
    if ( !(window.File && window.FileReader && window.FileList && window.Blob) ){
        alert("What the fuck with ur browser? UPDATE IT SONOFABITH!!!!");  //TODO: error handler and don`t humiliate user anymore...
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
            alert("SOME ERROR WHILE READING JSON!!!");  //TODO: error handler
        };
    });

});