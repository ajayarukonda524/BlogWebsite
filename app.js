const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = "mongodb+srv://ajayarukonda524:ajayarukonda@nodejs.em54la4.mongodb.net/BlogManager?retryWrites=true&w=majority&appName=nodejs";

mongoose.connect(dbURI)
.then((result) => {
    console.log("listening on port 3000...");
    app.listen(3000);

})
.catch((err) => console.log(err));

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));
app.use(morgan('dev')); 


app.get('/', (req, res) => { 
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})