const db = require('./db.js');
function getExercise(params,cb){
    let context = {
        id:params.id,
    }
    let values = [context.id]
    let query = `SELECT 
        id_excercise as "idExercise",
        repetitions,
        series,
        rest
        FROM excercises where id_excercise = any(ARRAY[${params.idsExercises}]);`
    db.query(query,null,(err,data)=>{
        cb(data.rows)
    })
    
}
module.exports = getExercise;