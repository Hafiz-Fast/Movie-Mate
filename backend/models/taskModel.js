const { sql, poolPromise } = require('../config/db');
const { DeleteMovie, UpdateRating, AddTheater, AddSeatRecord, AddShowPrice, ViewMovies, ViewTheaters, ViewShows, delete_seatrecord, update_seatrecord, Update_showtimings } = require('../controllers/taskController');

const Task = {
  
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
  
  async delete_seatrecord(SeatId){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
       .input('SeatId',sql.Int,SeatId)
       .execute('delete_seatrecord');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async update_seatrecord(ID, totals, availSeats, Occupied, f, m){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
       .input('ID',sql.Int,ID)
       .input('totals',sql.Int,totals)
       .input('availSeats',sql.Int,availSeats)
       .input('Occupied',sql.Int,Occupied)
       .input('f',sql.Int,f)
       .input('m',sql.Int,m)
       .execute('update_seatrecord');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async Delete_showtime_id(ShowTimeID){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
       .input('ShowTimeID',sql.Int,ShowTimeID)
       .execute('Delete_showtime_id');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async Update_movie(movieid,title,type,genre,duration,ratingid){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
       .input('movieid',sql.Int,movieid)
       .input('title',sql.Int,title)
       .input('type',sql.Int,type)
       .input('genre',sql.Int,genre)
       .input('duration',sql.Int,duration)
       .input('rating',sql.Int,rating)
       .execute('Update_movie');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async Update_showtimings(ShowTimeID, movieid, theaterid, showdate, showtiming, priceid) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('ShowTimeID', sql.Int, ShowTimeID)
        .input('movieid', sql.Int, movieid)
        .input('theaterid', sql.Int, theaterid)
        .input('showdate', sql.Date, showdate)
        .input('showtiming', sql.Time, showtiming)
        .input('priceid', sql.Int, priceid)
        .execute('update_showtimings'); 
      return result.recordset;
    } catch (error) {
      console.error("Error executing stored procedure:", error);
      throw error;
    }
  },

  async delete_rating(RatingID) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('RatingID', sql.Int, RatingID)
        .execute('delete_rating');
  
      return result.recordset;
    } catch (error) {
      console.error("Error executing stored procedure:", error);
      throw error;
    }
  },
  
  async Delete_theater(theaterid) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('theaterid', sql.Int, theaterid)
        .execute('Delete_theater');
  
      return result.recordset;
    } catch (error) {
      console.error("Error executing stored procedure:", error);
      throw error;
    }
  },







  
  

};

module.exports = Task;
