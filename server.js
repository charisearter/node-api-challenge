
const express = require('express');

const server = express();
server.use(express.json());

//Projects Router
const projectRouter = require('./data/routers/projectRouter');
server.use('/api/projects', logger, projectRouter);

//Actions Router
const actionRouter = require('./data/routers/actionRouter'); 
server.use('/api/actions', logger, actionRouter);


server.get('/', (req, res) => {
  const message = process.env.MESSAGE || 'Sprint 4.1';
  res.status(200).json({message});
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`
  );
  next();
}

module.exports = server;
