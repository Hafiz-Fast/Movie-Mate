const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.createTask = async (req, res) => {
    try {
      const { title, description} = req.body;
      await Task.createTask(title, description);
      res.status(201).json({ message: 'Task created using stored procedure' });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
    const {MovieName} = req.body;
    await Task.DeleteMovie(MovieName);
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

//--------------//
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.updateTask(req.params.id, title, description);
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
