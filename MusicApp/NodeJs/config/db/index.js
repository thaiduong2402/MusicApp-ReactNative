const mongoose = require('mongoose')
 
async function connect(){
    try {

        await mongoose.connect('mongodb://localhost:27017/first_database',{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('ket noi du lieu thanh cong')
    } catch (error) {
        console.log('ket noi du lieu that bai')
    }
}

module.exports = {connect}