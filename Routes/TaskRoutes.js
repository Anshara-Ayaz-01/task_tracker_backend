const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  getOverdueTasks
} = require('../Controller/TaskController');
const checkAuth = require('../middleware/checkAuth');

// Routes
router.post('/', checkAuth, createTask);
router.get('/', checkAuth, getTasks);
router.patch('/:id', checkAuth, updateTask);
router.get('/overdue', checkAuth, getOverdueTasks);

module.exports = router;
