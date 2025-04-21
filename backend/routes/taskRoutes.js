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
router.delete('/delete_seatrecord',taskController.delete_seatrecord);
router.put('/update_seatrecord',taskController.update_seatrecord);
router.delete('/Delete_showtime_id',taskController.Delete_showtime_id);
router.put('/Update_movie',taskController.Update_movie);
router.put('/Update_showtimings',taskController.Update_showtimings);
router.delete('/Delete_rating',taskController.delete_rating);
router.delete('/Delete_theater',taskController.Delete_theater);








module.exports = router;
