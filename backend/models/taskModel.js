const { sql, poolPromise } = require('../config/db');
const { NVarChar } = require('mssql');

const Duration = (DurationString) => {
  const duration = new Date(DurationString);

  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  const seconds = duration.getUTCSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const Time = (nTime) => {
  const duration = new Date(nTime);

  let hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();

  let quarter;

  if(hours < 12){
      quarter = 'AM';
  }else{
      quarter = 'PM';
  }

  hours = (hours === 0) ? 12 : hours;
  hours = hours > 12 ? hours - 12 : hours;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${quarter}`;
}

const date = (nTime) => {
  const Ttime = new Date(nTime);

  const date = Ttime.getUTCDate();
  const month = Ttime.getUTCMonth() + 1;
  const year = Ttime.getUTCFullYear();

  const fDate = date < 10 ? `0${date}` : date;
  const fMonth = month < 10 ? `0${month}` : month;

  return `${year}-${fMonth}-${fDate}`;
}

const FormatDuration = (result) =>{
  const formattedRecordSet = result.recordset.map(row => ({
      ...row,
      Duration: Duration(row.Duration) // Format the date
  }));

  const formattedResult = {
      ...result,
      recordset: formattedRecordSet,
      recordsets: [formattedRecordSet], // Ensuring same structure as original
  };

  return formattedResult;
}

const FormatTime = (result) => {

  const formattedDuration = FormatDuration(result);

  const formattedRecordSet = formattedDuration.recordset.map(row => ({
      ...row,
      ShowTiming: Time(row.ShowTiming),
      ShowDate: date(row.ShowDate)
  }));

  const finalResult = {
      ...result,
      recordset: formattedRecordSet,
      recordsets: [formattedRecordSet]
  }

  return finalResult;
}

const reformatDate = (result) => {
  const ShowDate = new Date(result);
  const formattedShowDate = ShowDate.toISOString().split('T')[0];
  return formattedShowDate; 
}

const reformatTime = (inputTime) => {
  const timeFormat = /(\d{1,2}):(\d{2}) (AM|PM)/i;
    const match = inputTime.match(timeFormat);

    if (!match) {
        throw new Error("Invalid time format");
    }

    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    // Convert 12 AM to 00:xx, 12 PM stays 12:xx
    if (period === 'AM' && hours === 12) {
        hours = 0; // 12 AM -> 00
    } else if (period === 'PM' && hours !== 12) {
        hours += 12; // Convert PM hours to 24-hour format
    }

    // Pad single-digit hours with a leading zero
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}:00`;

    return new Date(`1970-01-01T${formattedTime}Z`);
}

const Task = {
  
  //MovieMate 
  async AddMovie(Title, MovieType, Genre, Duration, links){
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('Title',sql.VarChar,Title)
        .input('MovieType',sql.VarChar,MovieType)
        .input('Genre',sql.VarChar,Genre)
        .input('Duration',sql.VarChar,Duration)
        .input('links',sql.VarChar,links)
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

  async ViewBookings(){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
         .execute('ShowBookings');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },

  async ViewUsers(){
    try{
      const pool = await poolPromise;
      const result = await pool.request()
         .execute('ShowUsers');
      return result.recordset;
    }
    catch(error){
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  },
  
  /* Abdullah bhai */
  async SignUp(username, email, password, userType){
    try{
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .input('UserType', sql.VarChar, userType)
            .output('flag', sql.Int)
            .execute('Signup');
            
            const flag = result.output.flag; 
            return flag;
      }
      catch(error){
          console.error("Error executing stored procedure:", error);
          throw error; 
      }
    },
    async LoginE(email, password){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .input('password', sql.NVarChar, password)
                .output('flag', sql.Int)
                .execute('loginE');
            
            return result;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async LoginU(userName, password){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Username', sql.NVarChar, userName)
                .input('password', sql.NVarChar, password)
                .output('flag', sql.Int)
                .execute('loginU');
                
            return result;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async updatePass(email, oPass, nPass){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .input('oldPass', sql.NVarChar, oPass)
                .input('newPass', sql.NVarChar, nPass)
                .output('flag', sql.Int)
                .execute('updatePass');
                const flag = result.output.flag;
                return flag;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async Browse(){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
            .execute('browse');

            const formattedResult = FormatDuration(result);
            
            return formattedResult;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async ComingSoon(){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
            .execute('comingSoon');

            return result;
        }catch(error){
            console.error("Error executing stored procedure:", error);
            throw error;    
        }
    },
    async MovieSearch(MovieName){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .input('movieName', NVarChar, MovieName)
                .execute('searchMovie');

            const formattedResult = FormatDuration(result);
                
            return formattedResult;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async Screenings(){
        try{
            const pool = await poolPromise;
            let result = await pool.request()
                .execute('screeningDetails');

            result = FormatTime(result);
            
            return result;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async Sscreening(MovieName){
        try{
            const pool = await poolPromise;
            let result = await pool.request()
                .input('movieName', NVarChar, MovieName)
                .execute('SscreeningDetails');

            result = FormatTime(result);

            return result;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async PStatusupdate(bookingID, status){
        try{
            const pool = await poolPromise;
            await pool.request()
                .input('bookingID', sql.Int, bookingID)
                .input('Status', sql.Int, status)
                .execute('PayementStatusUpdate');
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async MovieBooking(UserID, Moviename, ScreenType, ShowDate, MovieTiming, SeatNumber, IsNew){
        try{
            const formattedDate = reformatDate(ShowDate);
            const formattedTime = reformatTime(MovieTiming);
            const pool = await poolPromise;
            await pool.request()
                .input('UserID', sql.Int, UserID)
                .input('Moviename', sql.VarChar, Moviename)
                .input('ScreenType', sql.VarChar, ScreenType)
                .input('ShowDate', sql.Date, formattedDate)
                .input('MovieTiming', sql.Time, formattedTime)
                .input('SeatNumber', sql.Char(2), SeatNumber)
                .input('IsNew', sql.Int, IsNew)
                .execute('UserBooking');
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async PaymentReceipt(UserID, Moviename, ScreenType, ShowDate, MovieTiming, PaymentMethod, Amount){
      try{
        const formattedDate = reformatDate(ShowDate);
        const formattedTime = reformatTime(MovieTiming);
        const pool = await poolPromise;
        await pool.request()
            .input('UserID', sql.Int, UserID)
            .input('Moviename', sql.VarChar, Moviename)
            .input('ScreenType', sql.VarChar, ScreenType)
            .input('ShowDate', sql.Date, formattedDate)
            .input('MovieTiming', sql.Time, formattedTime)
            .input('PaymentMethod', sql.VarChar, PaymentMethod)
            .input('Amount', sql.Int, Amount)
            .execute('PaymentReceipt');
      }
      catch(error){
          console.error("Error executing stored procedure:", error);
          throw error; 
      }
    },
    async viewSeats(TheaterID){
      try{
          const pool = await poolPromise;
          const result = await pool.request()
            .input('TheaterID', sql.Int, TheaterID)
            .execute('ViewSeats');

            return result;
      }catch(error){
        console.error("Error executing stored procedure:", error);
            throw error; 
      }
    },
    async SeatRecord(ShowTimeID){
      try{
        const pool = await poolPromise;
        const result = await pool.request()
          .input('ShowTimeID', sql.Int, ShowTimeID)
          .execute('getSeatRecord');

          return result;
      }catch(error){
        console.error("Error executing stored procedure:", error);
            throw error; 
      }
    }
  
};

module.exports = Task;