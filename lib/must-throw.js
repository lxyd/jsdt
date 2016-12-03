define(function() {
    return function mustThrow(fn, msg) {
        return function(/*args*/) {
            try {
                fn.apply(this, arguments);
            } catch(err) {
                return true;
            }
            throw new Error(msg || "error was not thrown");
        };
    }
});