//Action router

const express = require('express');

const router = express.Router();

//import user database and import post database
const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel')

//come back to it
router.post('/:id/projects', validateAction,(req, res) => {
  const newAction = req.body;
  Actions.insert({ ...newAction, project_id: req.params.id })
  .then(result => {
    res.status(201).json(result)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: "Action could not be created"})
  })
})

//Get request done
router.get('/', (req, res) => {
  Actions.get()
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: " There was an error getting the actions." })
  })
})

//Get request by ID done
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Action ID could not be found" })
  })
});

//Get actions by id done
router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
  .then(action => {
    res.status(201).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Could not find actions" })
  })
});

 //put request done
router.put('/:id',  (req, res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: " There was an error updating the action" })
  })
})

 //delete request done (need to add count to message)
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
  .then(action => {
    res.status(204).json({ message: `${action} deleted` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the action" })
  })
})


//middleware

//Validate action

function validateAction (req, res, next) {
  // must have description <= 128 characters
  // must have notes without size limit
 
  const description = req.body.description;
  const notes = req.body.notes;
  

  description < 1 ? res.status(400).json({ message: "description is required" }):
  description.length > 128 ? res.status(400).json({ message: "description is too long. Needs to be 128 characters or less." }
  ):

  !notes ? res.status(400).json({ message: "missing required notes" })
  :
  next();

}

module.exports = router;
