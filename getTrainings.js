const db = require('./db.js');
function getTrainings(params,cb){
    console.log('ooi getMoviments ', params)
    let context = {
        idTraining :params.idTraining,
    }
    let values = [context.idTraining]
    let query = `SELECT 
        id_training as "idTraining",
        ids_exercises as "idsExercises",
        name,
        letter
        FROM trainings where id_training = ${context.idTraining};`


    db.query(query,null,(err,data)=>{
        console.log("no return ", data.rows)
        cb(data.rows[0])
    })
    
}
module.exports = getTrainings;