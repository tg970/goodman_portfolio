// DEPENDENCIES
const express    = require('express');
const app        = express();
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose   = require('mongoose');
const sgMail     = require('@sendgrid/mail');
const morgan     = require('morgan');
require('pretty-error').start();

// Set env variables in dev env
if (app.get('env') == 'development') require('dotenv').config()

// CONFIG
const PORT       = process.env.PORT || 3000;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodman_portfolio';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Connect to Mongo
mongoose.connect ( mongoURI, { useNewUrlParser: true } );
const db = mongoose.connection;
db.on( 'error', ( err ) =>
  console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () =>
  console.log( 'Mongo OK'));
db.on( 'disconnected', () =>
  console.log( 'Mongo Disconnected' ));
mongoose.Promise = global.Promise;

// rate limit config
var apiLimiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests
  delayMs: 0 // disabled until limit is met
});

// Middleware
app.use('/', apiLimiter);
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny', {
  skip: function(req, res) { return req.url.indexOf('/socket.io') !== -1 }
}));

// Controllers
const blogCtrl = require( './controllers/blogCtrl' );
app.use('/blog', blogCtrl);


app.post('/contact', async (req, res) => {
  try {
    // console.log(req.body);
    const msg = {
      to: req.body.email,
      cc: 'snowbdr2332@gmail.com',
      from: 'info@tylergoodman.com',
      subject: req.body.subject,
      text: req.body.message,
      html: `Here's a copy of your message: </br> </br> <strong>${req.body.message}</strong>`,
    };
    const send = await sgMail.send(msg)
    res.status(200).json({send});
  } catch (e) {
    console.log(e.response.body);
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
