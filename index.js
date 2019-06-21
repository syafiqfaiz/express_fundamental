const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.envPORT || 5000;
const logger = require('./middleware/logger.js')


// init middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/api/members', require('./routes/api/members'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hai semua'
  });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

