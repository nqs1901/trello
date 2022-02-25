const express = require('express')

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const boardRoute = require('./board.route')
const listRoute = require('./list.route')
const cardRoute = require('./card.route')
const checkListRoute = require('./checkList.route')





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
    {
        path: '/list',
        route: listRoute,
    },
    {
        path: '/card',
        route: cardRoute,
    },
    {
        path: '/checklist',
        route: checkListRoute,
    },

]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router;
