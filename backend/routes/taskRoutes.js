const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

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
router.get('/theaters',taskController.ViewTheaters);
router.get('/Shows',taskController.ViewShows);
router.get('/Bookings',taskController.ViewBookings);
router.get('/Users',taskController.ViewUsers);

module.exports = router;
