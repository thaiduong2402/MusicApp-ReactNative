const User = require("../models/User")
const Song = require("../models/Song")
const Rating = require("../models/Rating")
const SongRating = require("../models/SongRating")
const Recommendation =require("./Recommendation")
const jsrecommender = require("js-recommender");
class UserController {


    async getAlbum(req,res)
    {
        const rap = await Song.find({'theLoai' : 'rap'})
        const nhacTre = await Song.find({'theLoai': 'nhactre'})
        const thieuNhi = await Song.find({'theLoai': 'thieunhi'})
        const bolero = await Song.find({'theLoai' : 'bolero'})
        const nhacTet = await Song.find({'theLoai': 'nhactet'})
        const phuot = await Song.find({'theLoai': 'phuot'})
        const album = [
            {
                id: 1,
                title: 'rap',
                albums:rap
            },
            {
                id: 2,
                title: 'nhac tre',
                albums:nhacTre
            },
            {
                id: 3,
                title: 'Thieu Nhi',
                albums:thieuNhi
            },
            {
                id: 4,
                title: "bolero",
                albums:bolero
            },
            {
                id: 5,
                title: "nhac tet",
                albums:nhacTet
            },
            {
                id: 6,
                title: 'Phuot',
                albums:phuot
            },

        ]
        res.send(album)
    }


    async likePost(req,res)
    {

        try {
            const update = await Rating.findOne({
                userName: req.body.userName,
                song : req.body.song,
            })
            if(update)
            {
                Rating.deleteOne({ "userName": req.body.userName,"song" : req.body.song,}).exec(function(err, book){
                    if(err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                             res.status(200).send("delete");
                    }
                 });
            }
            else{

                const rating = new Rating({
                userName: req.body.userName,
                song : req.body.song,
                
            })
            res.send("tao moi")
            const saveRating = await rating.save();
            res.status(200).send(req.body.userName)
        }
        } catch (error) {
            res.status(400).send(error)
        }


    }

    async getLike(req,res)
    {
        const userName = req.body.userName
        const rating = await Rating.find({userName})
        const song=[]
        rating.forEach((item)=>{

            song.push(item.song)

        })
        const songs = await Song.find({"ma" :song})
        res.send(songs)
        
    }
    home(req,res)
    {
        res.send('day la home user')
    }

    async UserPost(req,res)
    {     
        try {
            const update = await SongRating.findOne({
                user: req.body.userName,
                song : req.body.song,
            })
            if(update)
            {
                SongRating.findOneAndUpdate({ "user": req.body.user,"song" : req.body.song,}, { "$set": {"rating" : req.body.rating}}).exec(function(err, book){
                    if(err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                             res.status(200).send("update");
                    }
                 });
            }
            else{

                const songRating = new SongRating({
                user: req.body.user,
                song : req.body.song,
                rating : req.body.rating
                
            })
            res.send("tao moi")
            const saveSongRating = await songRating.save();
            res.status(200).send(req.body.user)
        }
        } catch (error) {
            res.status(400).send(error)
        }

    }

    async UserGet(req,res)
    {
        
    
    var recom = []
    var userRatiing = {
    }

    //var recommender = new jsrecommender.Recommender();
        
    var table = new jsrecommender.Table();


    // table.setCell('[movie-name]', '[user]', [score]);
    var SongRatings = await SongRating.find()
    SongRatings.forEach((item)=>{
            table.setCell(item.song,item.user,item.rating)
    })
    var recommender = new jsrecommender.Recommender({
        alpha: 0.001, // learning rate  0.001
        lambda: 0.01, // regularization parameter  0.001
        iterations: 500, // maximum number of iterations in the gradient descent algorithm  1000
        kDim: 3 // number of hidden features for each   7
    });
    var model = recommender.fit(table);

    var predicted_table = recommender.transform(table);

    var userId = req.params.id

    var songRa = []
    for (var i = 0; i < predicted_table.columnNames.length; ++i) {
        var user = predicted_table.columnNames[i];
        var allSongAnhRating = []
        for (var j = 0; j < predicted_table.rowNames.length; ++j) {
            var song = predicted_table.rowNames[j];
            var songAndRating={
                song:song,
                rating:Math.round(predicted_table.getCell(song, user))
            }
            allSongAnhRating.push(songAndRating)
        }
        allSongAnhRating.sort(function(a, b){
            return b.rating - a.rating;
        });
        userRatiing={
            user:user,
            songRating: allSongAnhRating
        }
       
        recom.push(userRatiing)

    }
    var result = recom.filter((item)=>{
        return item["user"]===userId
    })
    var result1 = result[0].songRating
    var result2 = result1.slice(0,6)
    var songRa = []
    result2.forEach((item)=>{
        songRa.push(item.song)
    })

    const songs= await Song.find({ma:songRa})
    
    res.json(songs)
    }

      


    async ngheNhieu(req,res)
    {
        const songs = await Song.find().sort({luotNghe:-1}).limit(3)
        res.send(songs)
    }
    async allSong(req,res)
    {
        let user = req.params.id
        const song = await Song.find().limit(5)
        res.json(song)
        
    }

    async login(req,res){
        const user = await User.findOne({userName:req.body.userName})  
        if(!user) return res.json({
            status: 400,
            "thongbao":"userNameNotExists"
        })
        const KTPassWord = await req.body.passWord === user.passWord ? true : false
        if(!KTPassWord)
        {
            return res.json({
                status: 400,
                "thongbao":"passWordNotExists"
            })
        }
        res.json({
            status: 200,
            userName:user.userName
        })

    }
    async register(req,res){
        const userNameExit = await User.findOne({userName:req.body.userName})   
        if(userNameExit) return res.json({
            status: 400,
            "thongbao":"userNameExists"
        })
        const user = new User({
                name: req.body.name,
                userName : req.body.userName,
                passWord : req.body.passWord
            });
            try {
                const saveUser = await user.save();
                res.status(200).json({
                    userName:user.userName
                })
                return res.redirect('/home' ,{userName:userName});
            } catch (error) {
                res.status(400).send(error)
    }
        
        
    }
}

module.exports = new UserController