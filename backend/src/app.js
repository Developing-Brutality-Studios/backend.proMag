const  express = require('express');
const cors = require('cors');
const app = express();

//setting 
app.set('port',process.env.PORT || 4000);

//midellwers
app.use(cors());
app.use(express.json());

//router
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/login', require('./routes/login'))

module.exports = app;