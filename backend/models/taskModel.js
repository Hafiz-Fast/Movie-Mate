const { NVarChar } = require('mssql');
const { sql, poolPromise } = require('../config/db');

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

    hours = hours > 12 ? hours - 12 : hours;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${quarter}`
}

const date = (nTime) => {
    const Ttime = new Date(nTime);

    const date = Ttime.getUTCDate();
    const month = Ttime.getUTCMonth() + 1;
    const year = Ttime.getUTCFullYear();

    const time = Time(nTime);

    const fDate = date < 10 ? `0${date}` : date;
    const fMonth = month < 10 ? `0${month}` : month;

    return `${year}-${fMonth}-${fDate}  ${time}`;
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
        ShowTiming: date(row.ShowTiming),
    }));

    const finalResult = {
        ...result,
        recordset: formattedRecordSet,
        recordsets: [formattedRecordSet]
    }

    return finalResult;
}

const Task = {
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
    }
}

module.exports = Task;
