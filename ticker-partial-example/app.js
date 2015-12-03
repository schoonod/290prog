/******* USUAL APP STUFF ********/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);    // uses handlebars as the .handlebars file handler
app.set('view engine', 'handlebars');           // allows omission of .handlebars ext when making view calls
app.set('port', 3001);

/******* IMPORTANT STUFF...LOOK HERE! *******/
// This is our partial context.
// It is static, however normally we would use a live 
// data feed to get our real-time stock tickers.
function stockTickers(){
    var tickers =
    {
        APPL: 116.28,
        GOOG: 762.38,
        LVS: 45.18
    };
    return tickers;
}

// This is our magic middleware.
// It's above our 'home' view render.
app.use(function(req, res, next){
    if(!res.locals.partials)
        res.locals.partials = {};
    res.locals.partials.tickers = stockTickers();
    next();
});

app.get('/',function(req, res, next){
    res.render('home');
});

/******* Other usual stuff *******/
// Page not found
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

// Error handling
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});


// Listen for requests
app.listen(app.get('port'), function(){
    console.log('Express started on port' + app.get('port') + '; press Ctrl-C to terminate.');
});