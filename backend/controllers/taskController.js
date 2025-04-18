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

exports.delete_seatrecord= async(req,res) => {
  try {
    const delete_seatrecord= await Task.delete_seatrecord();
    res.json(delete_seatrecord);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update_seatrecord= async(req,res) => {
  try {
    const {ID,totals,availSeats,Occupied,f,m} = req.body;
    await Task.update_seatrecord(ID,totals,availSeats,Occupied,f,m);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.Delete_showtime_id= async(req,res) => {
  try {
    const Delete_showtime_id= await Task.Delete_showtime_id();
    res.json(Delete_showtime_id);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.Update_movie= async(req,res) => {
  try {
    const {movieid,title,type,genre,duration,ratingid} = req.body;
    await Task.Update_movie(movieid,title,type,genre,duration,ratingid);
    res.status(201).json({ message: 'Task created using stored procedure' });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.Update_showtimings = async (req, res) => {
  try {
    const { ShowTimeID, movieid, theaterid, showdate, showtiming, priceid } = req.body;
    await Task.Update_showtimings(ShowTimeID, movieid, theaterid, showdate, showtiming, priceid);

    res.status(200).json({ message: 'Show timings updated using stored procedure' });
  } catch (error) {
    console.error("Error updating show timings:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.delete_rating = async (req, res) => {
  try {
    const { RatingID } = req.body;

    const result = await Task.delete_rating(RatingID);

    res.status(200).json({ message: 'Rating deleted using stored procedure', result });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.Delete_theater = async (req, res) => {
  try {
    const { theaterid } = req.body;

    const result = await Task.Delete_theater(theaterid);

    res.status(200).json({ message: 'Theater deleted using stored procedure', result });
  } catch (error) {
    console.error("Error deleting theater:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


