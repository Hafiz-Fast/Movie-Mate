const { NVarChar } = require('mssql');
const { sql, poolPromise } = require('../config/db');

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
                console.log("Flag:", flag);
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
            return result;
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
            return result;
        }
        catch(error){
            console.error("Error executing stored procedure:", error);
            throw error; 
        }
    },
    async Screenings(){
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .execute('screeningDetails');
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
            const result = await pool.request()
                .input('movieName', NVarChar, MovieName)
                .execute('SscreeningDetails');
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
