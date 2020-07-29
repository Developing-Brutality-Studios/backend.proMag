const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:1234@cluster0.18wxo.mongodb.net/ejem1?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('database is conected'))
    .catch(err => console.log(err));