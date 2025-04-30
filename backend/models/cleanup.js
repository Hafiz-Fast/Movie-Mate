const { sql, poolPromise } = require('../config/db');


const cleanupExpiredSeats={
    async cleanup(){
      try{
        const pool = await poolPromise;
        const result = await pool.request()
          .execute('CleanupIfNeeded');
  
          return result;
        }catch(error){
        console.error("Error executing stored procedure:", error);
            throw error; 
        }
    }
};

module.exports = cleanupExpiredSeats;