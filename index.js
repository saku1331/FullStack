// on server side we r using Commonjs modules
const express=require('express');
const app=express(); //this represents a running express app

// creating a route handler and associating it with given route
app.get('/', (req,res)=>{
    res.send({hi: 'there'}); // json data is sent
});

// look at the underlying environment and see if they have declared a port for us to use
const PORT=process.env.PORT || 5000;

app.listen(PORT); // telling node to listen to 5000 wala traffic
