const { sql, poolPromise } = require('../config/db');
const { DeleteMovie, UpdateRating, AddTheater, AddSeatRecord, AddShowPrice, ViewMovies } = require('../controllers/taskController');

const Task = {
  async getAllTasks() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Movie');
    return result.recordset;
  },

  async getTaskById(id) {
    const pool = await poolPromise;
    const result = await pool.request().input('id', sql.Int, id)
      .query('SELECT * FROM Movie WHERE MovieID = @id');
    return result.recordset[0];
  },

  //const result = await pool.request().query(`SELECT * FROM Tasks WHERE id = ${id}`);

//   async createTask(title, description) {
//     const pool = await poolPromise;
//     await pool.request()
//       .input('title', sql.VarChar, title)
//       .input('description', sql.VarChar, description)
//       .query('INSERT INTO Tasks (title, description) VALUES (@title, @description)');
//   },
  async createTask(title, description) {
    try{
    const pool = await poolPromise;
    await pool.request()
      .input('title', sql.VarChar, title)
      .input('description', sql.Text, description)
      .execute('CreateTask');  // Calls the stored procedure
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },
  
  //MovieMate 
  async AddMovie(Title, MovieType, Genre, Duration){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('Title',sql.VarChar,Title)
        .input('MovieType',sql.VarChar,MovieType)
        .input('Genre',sql.VarChar,Genre)
        .input('Duration',sql.Time,Duration)
        .execute('AddMovie');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async AddMovieRating(IMDbRating, Review, MovieName){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('IMDbRating',sql.Float,IMDbRating)
        .input('Review',sql.VarChar,Review)
        .input('MovieName',sql.VarChar,MovieName)
        .execute('AddIMDb');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async DeleteMovie(MovieName){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('MovieName',sql.VarChar,MovieName)
        .execute('RemoveMovie');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async UpdateRating(MovieName, NewRating){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('MovieName',sql.VarChar,MovieName)
        .input('NewRating',sql.Float,NewRating)
        .execute('UpdateIMDb');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async AddTheater(ScreenType){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('ScreenType',sql.VarChar,ScreenType)
        .execute('AddTheaters');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async AddSeatRecord(Total, TheaterID){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('Total',sql.Int,Total)
        .input('TheaterID',sql.Int,TheaterID)
        .execute('AddSeatRecord');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async AddShowTime(MovieID, TheaterID, Date, ShowTime){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('MovieID',sql.Int,MovieID)
        .input('TheaterID',sql.Int,TheaterID)
        .input('Date',sql.Date,Date)
        .input('ShowTime',sql.Time,ShowTime)
        .execute('AddShowTimings');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async AddShowPrice(Category, Amount, ShowID){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('Category',sql.VarChar,Category)
        .input('Amount',sql.Float,Amount)
        .input('ShowID',sql.Int,ShowID)
        .execute('AddShowPrice');
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async ViewMovies(){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
         .execute('ViewMovies');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  //-----------------//
  async updateTask(id, title, description) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.VarChar, title)
      .input('description', sql.Text, description)
      .query('UPDATE Tasks SET title = @title, description = @description WHERE id = @id');
  },

  async deleteTask(id) {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Tasks WHERE id = @id');
  }
};

module.exports = Task;
