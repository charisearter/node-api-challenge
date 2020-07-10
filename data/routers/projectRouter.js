//Project Router

const express = require('express');

const router = express.Router();

//import user database and import post database
const Projects = require('../helpers/projectModel')

//Get request done
router.get('/', (req, res) => {
  //get request Read
  Projects.get()
  .then(project => {
    res.status(200).json(project)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: " There was an error getting the project." })
  })
})

router.post('/', (req, res) => {
  Projects.insert({ name: req.body.name, description: req.body.description })
  .then(result => {
    res.status(201).json(result)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: "Project could not be created"})
  })
});

 //delete request done (need to add count to message)
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
  .then(project => {
    res.status(204).json({ message: `${project} deleted` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the project" })
  })
})

//middleware


module.exports = router;
