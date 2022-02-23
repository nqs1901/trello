const express = require('express')

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const boardRoute = require('./board.route')


const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/board',
        route: boardRoute,
    },

]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router;
