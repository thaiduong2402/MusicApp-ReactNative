const { json } = require('body-parser')
const Nguoi = require('../models/Nguoi')

class NguoiController {
    index(req,res,next){
        Nguoi.find({})
            .then(
                nguoi => res.send(
                    JSON.stringify({
                        success:true,
                        notice:'thanh cong',
                        data: nguoi
                    })
                )
            )
            .catch(
                next
            )
    }

}

module.exports = new NguoiController