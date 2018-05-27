// DEPENDENCIES
const express    = require('express');
const app        = express();
const morgan     = require('morgan');
require('pretty-error').start();

// Set env variables in dev env
//if (app.get('env') == 'development') require('dotenv').config()

// CONFIG
const PORT       = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny', {
  skip: function(req, res) { return req.url.indexOf('/socket.io') !== -1 }
}));

// READ
app.post('/contact', async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e.message});
  }
});

app.get('/:whatever', (req, res) => res.redirect('/'))
app.get('/:whatever/:whatever', (req, res) => res.redirect('/'))

app.listen(PORT, () => {
   console.log('Server OK');
});
