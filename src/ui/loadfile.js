define(['../parse'], function(parse) {
    "use strict";
    class OpenFileControl {
        constructor(engine, inputFile) {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                throw new Error("Browser doesn't support FileReader");
            }
            this.engine = engine;
            this.inputFile = inputFile;
            this.inputFile.addEventListener('change', this.onChange.bind(this));
        }
        
        onChange() {
            var userFile = this.inputFile.files[0];
    
            reader = new FileReader();
    
            reader.onload = function(evt) {
                try {
                    var jsonData = JSON.parse(evt.target.result);
                    var parsedJsdtPackage = parse(jsonData);
                } catch (err) {
                    this.engine.setError("Error parsing JSDT file: " + err);
                }
                this.engine.setData(parsedJsdtPackage);
            };
    
            reader.onerror = function(evt) {
                this.engine.setError("File couldn't be read");
            };
            
            reader.readAsText(userFile);
        }
    }
});