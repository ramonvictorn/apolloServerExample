const data = {
    authors : [
        {
            idAuthor:1,
            name:'Ramon'
        },
        {
            idAuthor:2,
            name:'tonnioli'
        }
    ],
    client: [
        {
            idClient:1,
            name:'Gym 1'
        }
    ],
    users:[
        {
            idUser:1,
            idClient:1,
            name:'usuario Ramon',
        }
    ],
    trainingsUsers:[
        {
            idUser:1,
            idClient:1,
            idsTrainings:[1,2]
        }
    ],
    trainings:[
        {
            idTraining:1,
            idExercise:[1],
        },
        {
            idTraining:2,
            idExercise:[2],
        }
    ],
    exercises: [
        {

            idExercise: 1,
            idMoviment: [1,3],
            repeats: 30,
        },
        {

            idExercise: 2,
            idMoviment: [2],
            repeats: 15,
        },
    ],
    moviments: [
        {
            idMoviment: 1,
            name: "Supino Reto",
            assets: ["google"],
        },
        {
            idMoviment: 2,
            name: "Supino Inclinado com Halteres",
            assets: ["google", "youtube"],
        },
        {
            idMoviment: 3,
            name: "Agachamento",
            assets: ["youtube"],
        }
    ]
};

exports.getData = function (collection, field, value) {
    let teste = data[collection].filter(element => element[field] === value);
    let dataToReturn = [];
    if(typeof value == 'object'){
        value.forEach(idParam => {
            dataToReturn.push(data[collection].filter(element => element[field] === idParam)[0]);
        });
        return dataToReturn;
    }
    dataToReturn = data[collection].filter(element => element[field] === value);
    return dataToReturn[0];
};