const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const { body, validationResult } = require('express-validator');

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

router.get('/Movies', taskController.browseMovies);

router.get('/Screenings', taskController.getScreenings);

module.exports = router;