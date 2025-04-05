const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const { body, validationResult } = require('express-validator');

router.post('/tasks',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').isLength({ min: 5 }).withMessage('Description should be at least 5 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.createTask
);

//MovieMate
router.post('/movies',taskController.AddMovie);
router.post('/MovieRating',taskController.AddMovieRating);
router.delete('/movies',taskController.DeleteMovie);
router.put('/MovieRating',taskController.UpdateRating);
router.post('/Theater',taskController.AddTheater);
router.post('/TheaterSeat',taskController.AddSeatRecord);
router.post('/ShowTime',taskController.AddShowTime)
router.post('/Prices',taskController.AddShowPrice);
router.get('/movies',taskController.ViewMovies);

//---------//
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
