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
