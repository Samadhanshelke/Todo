const express = require("express")
const { createTodo, getAllTodo, changeTodoStatus, updateTodo, deleteTodo } = require("../Controller/Todo")
const { auth } = require("../middleware/auth")
const router = express.Router()




router.post('/createTodo',auth,createTodo)
router.get('/getAllTodo',auth,getAllTodo)
router.post('/changeTodoStatus',auth,changeTodoStatus)
router.post('/updateTodo',auth,updateTodo)
router.post('/deleteTodo',auth,deleteTodo)

module.exports = router
