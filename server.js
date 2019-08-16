const { ApolloServer, gql } = require('apollo-server');
const data = require('./data.js');

const typeDefs = gql`
  type Training {
    idTraining: ID,
    exercise: [Exercise]
  }

  type Exercise {
    idExercise: ID,
    moviment: [Moviment],
    repeats: Int,
  }
  type Moviment {
    idMoviment: ID,
    name: String,
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
  }
`;

const resolvers = {
    Query: {
        trainingsUsers(obj,args){
          return data.getData('trainingsUsers', 'idUser', args.idUser); 
        },
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
      exercise: function(obj,args){
        return data.getData('exercises', 'idExercise', obj.idExercise);
      }
    },
    Exercise:{
      moviment : function(obj,args){
        return data.getData('moviments', 'idMoviment', obj.idMoviment);
      }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});