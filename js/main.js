requirejs.config({
    baseUrl: 'js',
});

requirejs(['engine/engine'], function(engine) {
    alert("It's working!");
});