
const { Pool, Client } = require('pg');
const logger = require('../logger.js');
const settings = require('../settings.js');
let pool; 
/**
 * @function initDb
 * @param {function} cb - Callback to run affer connection with databases 
 */
function initDb(cb){
    logger.log(`db.js - initDb Connectin with databases.. on ${settings.DB_HOST}`)
    pool = new Pool({
        user: settings.DB_USER,  
        host: settings.DB_HOST,
        database: settings.DB_DATABASE,
        password: settings.DB_PASSWORD,
        port: settings.DB_PORT,
        // ssl: true
    })
    
    pool.connect((err, client, done) => {
        if(err){
            logger.log('db.js: error -' , err)
            pool.end()
            process.exit(-1)
        }else{
            logger.log('db.js - databases connected!')
            cb()
        }
    })
    pool.on('error', (err, client) => {
        logger.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
}

module.exports = {
    initDb,
    query,
}


function query(query,values, cb){
    pool.query(query, values, (err, res) => {
        if(err){
            if(cb(err,res) == true){
                    logger.log('deu true')
            }else{
                    logger.log('n deu true', err)
                
                pool.end()
                throw(new Error(`db.js: unhandled error`));
            }    
        }else{
            cb(err,res)
        }
    })
}
