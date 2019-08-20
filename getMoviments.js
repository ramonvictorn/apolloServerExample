const db = require('./db.js');
function getMoviments(params,cb){
    console.log('ooi getMoviments ', params)
    let context = {
        id:params.id,
    }
    let values = [context.id]
    let query = `SELECT * FROM moviments`
    db.query(query,null,(err,data)=>{
        console.log("no return ", data.rows)
        cb(data.rows)
        // return data.rows;
    })
    
}
module.exports = getMoviments;