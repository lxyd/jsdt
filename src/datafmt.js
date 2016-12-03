define(['./model'], function(model) {
    // FUTURE : delegate to ./datafmt-versions/datafmt-X by requireing
    //          particular datafmt module depending on obj.version

    function parse(obj) {
        // TODO : implement
    }
    
    function serialize(package) {
        // TODO : implement
    }
    
    return {
        parse     : parse,
        serialize : serialize,
    }
});