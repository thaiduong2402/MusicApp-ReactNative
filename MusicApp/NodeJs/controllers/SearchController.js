const Song = require("../models/Song")


class SearchController {
    get(req,res){
        res.send("haha")
        
    }
    async post(req,res){
        var search = req.body.search
        Song.find({ "ten": { $regex: '.*' + search + '.*',$options: 'i' } },
        function(err,data){
        console.log('data',data);
        var result = data.slice(0,20)
        res.json(result)
         });
    }


    async theLoai(req,res)
    {
        var search = req.body.search
        var song =  await Song.find({theLoai:search}).limit(6)
        res.send(song)
    }
}

module.exports = new SearchController