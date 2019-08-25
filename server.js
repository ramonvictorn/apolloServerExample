const { ApolloServer, gql } = require('apollo-server');
const data = require('./data.js');
const getMoviments = require('./getMoviments.js');
const typeDefs = gql`
  type Training {
    idTraining: ID,
    name : String,
    letter : String,
    exercises: [Exercise]
  }

  type Exercise {
    idExercise: ID,
    moviment: [Moviment],
    repetitions: Int,
    series: Int,
    rest: Int,
  }
  type Moviment {
    idMoviment: ID,
    name: String,
    muscle: String,
    assets: [String],
  }

  type TrainingsUsers {
    idTrainingUser: ID,
    idUser: Int,
    idClient:Int,
    trainings: [Training]
  }

  type Query {
    training(idTraining:Int): Training, 
    trainingsUsers(idUser:Int): TrainingsUsers,
    getTrainings(idTraining:Int) : Training
  }
`;

const resolvers = {
    Query: {
        trainingsUsers(obj,args){
          return data.getData('trainingsUsers', 'idUser', args.idUser); 
        },
        getTrainings(obj,args){
          return promiseDataGetTrainings(obj,args)
        }
        // training(obj,args){ 
        //   return data.getData('trainings', 'idTraining', args.idTraining);
        // }
    },
    TrainingsUsers: {
      trainings: function(obj,args){
        return data.getData('trainings', 'idTraining', obj.idsTrainings);
      }
    },
    Training: {
      exercises: function(obj,args){
        //return data.getData('exercises', 'idExercise', obj.idExercise);
        return promisseGetExercise(obj,args);
      }
    },
    Exercise:{
      moviment : async function(obj,args){
        return promiseGetMoviment(obj.ids_moviment);
        // return teste;  
        //return promiseData();
        //return data.getData('moviments', 'idMoviment', obj.idMoviment);
        //return  await db.query('SELECT name FROM moviments;',null,async (err,data)=>{return data.rows});
      }
    }
};

let promiseGetMoviment = (params) => {
  return new Promise((resolve, reject) => {
    getMoviments(params,(data) => {
      resolve(data);
    });
  });
};
const getExercise = require('./getExercise.js')
let promisseGetExercise = (obj,args) => {
  return new Promise((resolve,reject)=>{
    getExercise(obj,(data)=>{
      resolve(data);
    })
  })
}

//const getMovimentModel = require('./src/core/models/getMoviments.js');
let promiseData = (args) => {
    return new Promise((resolve, reject) => {
        getMoviments({},(data) => {
            console.log('aaa', data)
            resolve(data);
        });
    });
};

const getTrainings = require('./getTrainings.js')
let promiseDataGetTrainings = (obj,args) => {
  return new Promise((resolve, reject) => {
      getTrainings(args,(data) => {
        console.log('getTrainings', data)
        resolve(data);
      });
  });
};

const server = new ApolloServer({ typeDefs, resolvers });
const db = require('./db.js');
db.initDb(()=>{
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})