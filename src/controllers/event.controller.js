const Event=require('../models/Event')
const createEvent = async (req, res) => {
     const {
      title,
      description,
      dateTime,
      location,
      capacity,
      imageUrl
    } = req.body;
    if(!title ||!description||!dateTime||!location||!imageUrl||!capacity)
        return res.status(400).json({message:"All fields are required"});
    try{
        const newEvent=new Event({
            title,
            description,
            dateTime,
            location,
            capacity,
            imageUrl,
            createdBy:req.user.userId,
            currentCount:0
        });
        await newEvent.save()

        return res.status(201).json({
            message:"Event is created",
            eventId:newEvent._id,
            eventDetails:newEvent
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal error"});
    }

}

const getAllEvents = async (req, res) => {
    console.log("gett all events");
}

const updateEvent = async (req, res) => {
    console.log("update event");
}

const deleteEvent = async (req, res) => {
    console.log("delete event");
}

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };