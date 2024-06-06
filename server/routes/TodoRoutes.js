const express = require("express")
const { createTodo, getAllTodo, changeTodoStatus, updateTodo, deleteTodo, getAllUser, ChangeAccess } = require("../Controller/Todo")
const { auth, isAdmin, isSuperAdmin ,isAdminOrSuperAdmin} = require("../middleware/auth")
const router = express.Router()




router.post('/createTodo',auth,createTodo)
router.get('/getAllTodo',auth,getAllTodo)
router.get('/getAllUser',auth,isAdminOrSuperAdmin,getAllUser)
router.post('/changeAccess',auth,isSuperAdmin,ChangeAccess) 
router.post('/changeTodoStatus',auth,changeTodoStatus)
router.post('/updateTodo',auth,updateTodo)
router.post('/deleteTodo',auth,deleteTodo)

module.exports = router
