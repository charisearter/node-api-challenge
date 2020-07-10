//Action router

const express = require('express');

const router = express.Router();

//import user database and import post database
const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel')


router.post('/', (req, res) => {
  //post request Create
})

//Get request done
router.get('/', (req, res) => {
  //get request Read
  Actions.get()
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: " There was an error getting the actions." })
  })
})

//Get request done
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


router.put('/', (req, res) => {
  //put request Update
})

router.delete('/', (req, res) => {
  //delete request Destroy
})


//middleware


module.exports = router;
