const { sql, poolPromise } = require('../config/db');
const { DeleteMovie, UpdateRating, AddTheater, AddSeatRecord, AddShowPrice, ViewMovies, ViewTheaters, ViewShows } = require('../controllers/taskController');

const Task = {
  
  //MovieMate 
  async AddMovie(Title, MovieType, Genre, Duration){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('Title',sql.VarChar,Title)
        .input('MovieType',sql.VarChar,MovieType)
        .input('Genre',sql.VarChar,Genre)
        .input('Duration',sql.VarChar,Duration)
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

  async DeleteMovie(MovieID, MovieName){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('MovieID',sql.Int,MovieID)
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
        .input('ShowTime',sql.VarChar,ShowTime)
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

  async ViewTheaters(){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
         .execute('ShowTheaters');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async ViewShows(){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
         .execute('ViewShowTimings');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },
  
};

module.exports = Task;
