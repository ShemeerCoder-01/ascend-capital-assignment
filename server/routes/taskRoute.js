const express = require('express');
const router = express.Router();
const { getAllLists, addList, updateList } = require('../controllers/taskController');

router.get('/all', getAllLists);

router.post('/add', addList);

router.put('/item', updateList);


module.exports = router;