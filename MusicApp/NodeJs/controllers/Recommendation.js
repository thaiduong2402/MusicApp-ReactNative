
const Recommend=(rating,recom)=>{

    var jsrecommender = require("js-recommender");
    var recommender = new jsrecommender.Recommender();      
    var table = new jsrecommender.Table();
    rating.forEach((item)=>{
        table.setCell(item.name,item.user,item.score)
    })

    //var model = recommender.fit(table);
    //console.log(model);

    predicted_table = recommender.transform(table);

    console.log(predicted_table);


    for (var i = 0; i < predicted_table.columnNames.length; ++i) {
        var user = predicted_table.columnNames[i];
        console.log('For user: ' + user);
        for (var j = 0; j < predicted_table.rowNames.length; ++j) {
            var song = predicted_table.rowNames[j];

            var tam = {
                song: song,
                rating:Math.round(predicted_table.getCell(movie, user))
            }
            recom.push(tam);
            //console.log('Movie [' + movie + '] has actual rating of ' + Math.round(table.getCell(movie, user)));
            //console.log('Movie [' + movie + '] is predicted to have rating ' + Math.round(predicted_table.getCell(movie, user)));
            
        }
    }
}

module.exports  =  Recommend



/*const myRecords = [
    {
            name:'Remance forever',
            user:"Alice",
            score: 5
     },
    {
        name:'Love at last',
        user:"Alice",
        score: 5
    },
    {
        name:'Nonstop car chases',
        user:"Alice",
        score: 1
    },
    {
        name:'Sword vs. karate',
        user:"Alice",
        score: 1
    },
    {
        name:'Love at last',
        user:"Bob",
        score: 5
    },
    {
        name:'Cute puppies of love',
        user:"Bob",
        score: 4
    },
    {
        name:'Nonstop car chases',
        user:"Bob",
        score: 2
    },
    {
        name:'Sword vs. karate',
        user:"Bob",
        score: 1
    },
    {
        name:'Love at last',
        user:"Carol",
        score: 1
    },
    {
        name:'Cute puppies of love',
        user:"Carol",
        score: 2
    },
    {
        name:'Nonstop car chases',
        user:"Carol",
        score: 5
    },
    {
        name:'Sword vs. karate',
        user:"Carol",
        score: 5
    },
    {
        name:'Love at last',
        user:"Dave",
        score: 1
    },
    {
        name:'Remance forever',
        user:"Dave",
        score: 0
    },
    {
        name:'Nonstop car chases',
        user:"Dave",
        score: 4
    },
    {
        name:'Nonstop car chases',
        user:"Duong",
        score: 4
    },
    
    ];*/
    


    
           /* var recommender = new jsrecommender.Recommender({
                alpha: 0.01, // learning rate
                lambda: 0.0, // regularization parameter
                iterations: 500, // maximum number of iterations in the gradient descent algorithm
                kDim: 2 // number of hidden features for each movie
            });*/


  // table.setCell('[movie-name]', '[user]', [score]);
/*table.setCell('Love at last', 'Alice', 5);
table.setCell('Remance forever', 'Alice', 5);
table.setCell('Nonstop car chases', 'Alice', 0);
table.setCell('Sword vs. karate', 'Alice', 0);
table.setCell('Love at last', 'Bob', 5);
table.setCell('Cute puppies of love', 'Bob', 4);
table.setCell('Nonstop car chases', 'Bob', 0);
table.setCell('Sword vs. karate', 'Bob', 0);
table.setCell('Love at last', 'Carol', 0);
table.setCell('Cute puppies of love', 'Carol', 0);
table.setCell('Nonstop car chases', 'Carol', 5);
table.setCell('Sword vs. karate', 'Carol', 5);
table.setCell('Love at last', 'Dave', 0);
table.setCell('Remance forever', 'Dave', 0);
table.setCell('Nonstop car chases', 'Dave', 4);*/