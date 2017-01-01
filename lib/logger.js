define(function () {
    /** Simle logger */
    class logger {
        /**
         * Get context
         * @param {String} context - Fatal, Errors, Info, Debug, Verbose. Debug is default
         */
        constructor(context) {
            var levels = {
                "Fatal"     : 0,
                "Errors"    : 1,
                "Info"      : 3,
                "Debug"     : 4,
                "Verbose"   : 5,
            };
            this.context = levels[context];
            
            if (undefined === console.info) {
                this.info = console.log;
            }
            else {
                this.info = console.info;
            }
            
            
            if (undefined === console.warn) {
                this.warn = console.log;
            }
            else {
                this.warn = console.warn;
            }
            
            
            if (undefined === console.error) {
                this.error = console.log;
            }
            else {
                this.console.error;
            }
        }

        /**
         * main printer, used in other functions
         * @param {String} context
         * @param {String} msg
         * @param {String} place - Defaults to ""
         * @returns {undefined}
         */
        _print(context, msg, place) {
            var output = context + ":  ";
            output = output.toUpperCase();
            
            output += this.time + " ";
            output += msg + "  ";
            
            output += place | "";
            output += "\n";
            
            console.log(output);
        }
    }
});

