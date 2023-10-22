/* eslint-disable no-undef */

import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db/connect.js';

import UserAuthRoutes from './routes/userAuthRoutes.js';
import RecruiterRoutes from './routes/recruiterRoutes.js';
import passportConfig from './config/passport.js';

import jobRoutes from './routes/jobRoutes.js';
import jobApplicantRoutes from './routes/jobApplicantRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

import notFoundMiddleWare from './middlewares/not-found.js';
import errorHandleMiddleware from './middlewares/error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // <-- location of the react app were connecting to
    credentials: true,
    exposedHeaders: ['Set-cookie'],
  }),
);
app.use(cookieParser());

// app.use(notFoundMiddleWare);

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

app.set('trust proxy', 1);

// The code-snippet of 'Initializing Session' below should be at this place only
app.use(
  session({
    secret: process.env.SOME_LONG_UNGUESSABLE_STRING,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: url }),
    cookie: {
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 3600000 * 24 * 7,
      sameSite: 'none',
    },
  }),
);

app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);

  try {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);

const start = async () => {
  try {
    await connectDB(url);
    app.listen(PORT, () => {
      /* eslint-disable no-console */
      console.log(`Server is running on port ${PORT}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    /* eslint-enable no-console */
  }
};

passportConfig(passport);

// jobs routes
app.use('/api/v1/jobs', jobRoutes);

// jobApplicant routes
app.use('/api/v1/jobapplicant', jobApplicantRoutes);

// authentication routes
app.use('/api/v1/user', UserAuthRoutes);

// recruiter routes
app.use('/api/v1/recruiter', RecruiterRoutes);

// application routes
app.use('/api/v1/applications', applicationRoutes);

app.use(express.static(path.join(__dirname, '../server/clientbuild')));
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../server/clientbuild', 'index.html'));
});

// Middlewares
app.use(notFoundMiddleWare);
app.use(errorHandleMiddleware);

start();
