const newRouter = require('./news')
const NguoiRouter = require('./nguoi')
const UserRouter = require('./user')
const SearchRouter = require('./search')
function route(app){


app.use('/news', newRouter)
app.use('/nguoi', NguoiRouter)
app.use('/search', SearchRouter)
app.use('/user', UserRouter)
app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

}

module.exports = route