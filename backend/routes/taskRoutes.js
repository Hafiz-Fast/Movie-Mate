const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

//Error Handling
const { body, validationResult } = require('express-validator');

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

// Abdullah bhai
const validateEmail = body('email').isEmail().withMessage('Please enter a valid email');
const validatePassword = (field) => {
    return body(field)
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character');
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/login-email',[
      validateEmail,
  ],

  validateRequest,
  taskController.loginWithEmail);

router.post('/login-username', taskController.loginWithUsername);

router.post('/signup', [
    validateEmail,
    validatePassword('password'),
  ],

  validateRequest,
  taskController.signUp);

router.put('/update-password', [
    validateEmail,
    validatePassword('nPass'),
  ],

  validateRequest, taskController.updatePassword);

router.put('/Payement', taskController.updatePaymentStatus);

router.post('/search-movie', taskController.searchMovie);

router.post('/search-screening', taskController.getScreeningsForMovie);

router.get('/browseMovies', taskController.browseMovies);

router.get('/Coming-soon', taskController.ComingSoon);

router.get('/Screenings', taskController.getScreenings);

router.post('/booking', taskController.BookMovie);

router.post('/seats', taskController.SeatsData);

router.post('/seatRecord', taskController.seatRecord);

router.post('/PaymentReceipt', taskController.PaymentReceipt);

module.exports = router;
