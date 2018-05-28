// DEPENDENCIES
const express    = require('express');
const app        = express();
const sgMail     = require('@sendgrid/mail');
const morgan     = require('morgan');
require('pretty-error').start();

// Set env variables in dev env
if (app.get('env') == 'development') require('dotenv').config()

// CONFIG
const PORT       = process.env.PORT || 3000;
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const msg = {
      to: req.body.email,
      from: 'tgoodman@outlook.com',
      subject: req.body.subject,
      text: req.body.message,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    const send = await sgMail.send(msg)
    res.status(200).json({});
  } catch (e) {
    console.log(e.response.body.errors);
    res.status(400).json({err: e.message});
  }
});


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs




app.get('/:whatever', (req, res) => res.redirect('/'))
app.get('/:whatever/:whatever', (req, res) => res.redirect('/'))

app.listen(PORT, () => {
   console.log('Server OK');
});
