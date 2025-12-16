const express=require('express')
const eventRouter=express.Router();
const auth=require('../middlewares/auth.middleware');
const { createEvent, getAllEvents, updateEvent, deleteEvent }=require('../controllers/event.controller')

eventRouter.post('/create/event',auth,createEvent)
eventRouter.get('/get/events',getAllEvents)
eventRouter.patch('/update/event/:id',auth,updateEvent)
eventRouter.delete('/delete/event/:id',deleteEvent)


module.exports=eventRouter;