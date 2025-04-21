const Task = require('../models/taskModel');

//MovieMate
exports.AddMovie = async (req,res) => {
  try {
    const {Title, MovieType, Genre, Duration} = req.body;
    await Task.AddMovie(Title, MovieType, Genre, Duration);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddMovieRating = async (req,res) => {
  try {
    const {IMDbRating, Review, MovieName} = req.body;
    await Task.AddMovieRating(IMDbRating, Review, MovieName);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.DeleteMovie = async (req,res) => {
  try {
    const {MovieID, MovieName} = req.body;
    await Task.DeleteMovie(MovieID, MovieName);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.UpdateRating = async (req,res) => {
  try {
    const {MovieName, NewRating} = req.body;
    await Task.UpdateRating(MovieName, NewRating);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddTheater = async (req,res) => {
  try {
    const {ScreenType} = req.body;
    await Task.AddTheater(ScreenType);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddSeatRecord = async (req,res) => {
  try {
    const {Total,TheaterID} = req.body;
    await Task.AddSeatRecord(Total,TheaterID);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddShowTime = async (req,res) => {
  try {
    const {MovieID, TheaterID, Date, ShowTime} = req.body;
    await Task.AddShowTime(MovieID, TheaterID, Date, ShowTime);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AddShowPrice = async (req,res) => {
  try {
    const {Category, Amount, ShowID} = req.body;
    await Task.AddShowPrice(Category, Amount, ShowID);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ViewMovies = async (req,res) => {
  try {
    const movies = await Task.ViewMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ViewTheaters = async(req,res) => {
  try {
    const theaters = await Task.ViewTheaters();
    res.json(theaters);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ViewShows = async(req,res) => {
  try {
    const shows = await Task.ViewShows();
    res.json(shows);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ViewBookings = async(req,res) => {
  try {
    const bookings = await Task.ViewBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ViewUsers = async(req,res) => {
  try {
    const users = await Task.ViewUsers();
    res.json(users);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* Abdullah Bhai the great */
// Signup controller
exports.signUp = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    
    const flag = await Task.SignUp(username, email, password, userType);
    
    switch (flag) {
      case 0:
          return res.status(201).json({ message: 'Signup successful' }); break;
      case 1:
          return res.status(400).json({ message: 'Email already exists' }); break;
      case 2:
          return res.status(400).json({ message: 'Username already exists' }); break;
      case 3:
          return res.status(400).json({ message: 'Invalid user type' }); break;
      default:
          return res.status(500).json({ message: 'Unknown error during signup' }); break;
    }

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login with Email
exports.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await Task.LoginE(email, password);
    const flag = result.output.flag;

    switch(flag){
      case 0:
        return res.status(200).json({message: 'Login Successful',
          data: result.recordset
         });
      case 1:
        return res.status(400).json({message: 'Email or Password is incorrect' });
      default:
        return res.status(500).json({message: 'Unknown error using Login' });
    }
  } catch (error) {
    console.error("LoginE Error:", error);
    res.status(500).json({error: 'Internal Server Error' });
  }
};

// Login with Username
exports.loginWithUsername = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await Task.LoginU(username, password);
    const flag = result.output.flag;

    switch(flag){
      case 0:
        return res.status(200).json({ message: 'Login Successful' ,
          data: result.recordset
        });
      case 1:
        return res.status(400).json({ message: 'Username or Password is incorrect' });
      default:
        return res.status(500).json({ message: 'Unknown error using Login' });
    }
  } catch (error) {
    console.error("LoginU Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  try {
    const { email, oPass, nPass } = req.body;
    
    const flag = await Task.updatePass(email, oPass, nPass);

    switch(flag){
      case 0:
        return res.status(200).json({ message: 'Password Changed Successfully'});
      case 1:
        return res.status(400).json({ message: 'Old Password is incorrect'});
      case 2:
        return res.status(400).json({ message: 'Old Password cannot be the same as new Password'});
      default:
        return res.status(500).json({ message: 'Unknown error using Login' }); 
    }
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Browse Movies
exports.browseMovies = async (req, res) => {
  try {
    const result = await Task.Browse();
    res.json(result.recordset);
  } catch (error) {
    console.error("Browse Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search Movie by Name
exports.searchMovie = async (req, res) => {
  try {
    const { MovieName } = req.body;
    const result = await Task.MovieSearch(MovieName);
    res.json(result.recordset);
  } catch (error) {
    console.error("Search Movie Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Get Coming soon Movies
exports.ComingSoon = async (req, res) => {
  try{
    const result = await Task.ComingSoon();
    res.json(result.recordset);
  } catch (error) {
    console.error("Browse Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Screenings
exports.getScreenings = async (req, res) => {
  try {
    const result = await Task.Screenings();
    res.json(result.recordset);
  } catch (error) {
    console.error("Screenings Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Screenings for Specific Movie
exports.getScreeningsForMovie = async (req, res) => {
  try {
    const { MovieName } = req.body;
    const result = await Task.Sscreening(MovieName);
    res.json(result.recordset);
  } catch (error) {
    console.error("Sscreening Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { bookingID, status } = req.body;
    await Task.PStatusupdate(bookingID, status);
    res.json({ message: 'Payment status updated' });
  } catch (error) {
    console.error("Payment Status Update Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.BookMovie = async (req, res) => {
  try{
    const { UserID, Moviename, ScreenType, ShowDate, MovieTiming, SeatNumber } = req.body;
    await Task.MovieBooking(UserID, Moviename, ScreenType, ShowDate, MovieTiming, SeatNumber);
    res.json({ message: 'Movie Booking sucessful' });
  }
  catch(error){
    console.error("Error Booking Movie:", error);
    res.status(500).json({ error: 'Internal Server Error'})
  }
};
