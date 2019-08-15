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

  type Query {
    training(idTraining:Int): Training, 
  }
`;

const resolvers = {
    Query: {
        training(obj,args){ 
          return data.getData('trainings', 'idTraining', args.idTraining);
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