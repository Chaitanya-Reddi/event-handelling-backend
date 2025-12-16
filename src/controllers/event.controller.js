const Event = require('../models/Event')
const createEvent = async (req, res) => {
    const {
        title,
        description,
        dateTime,
        location,
        capacity,
        imageUrl
    } = req.body;
    if (!title || !description || !dateTime || !location || !imageUrl || !capacity)
        return res.status(400).json({ message: "All fields are required" });
    try {
        const newEvent = new Event({
            title,
            description,
            dateTime,
            location,
            capacity,
            imageUrl,
            createdBy: req.user.userId,
            currentCount: 0
        });
        await newEvent.save()

        return res.status(201).json({
            message: "Event is created",
            eventId: newEvent._id,
            eventDetails: newEvent
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal error" });
    }

}

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ dateTime: 1 }).populate("createdBy", "email");
        if (events)
            return res.status(200).json({ events });
        return res.status(404).json({ message: "No events found for you" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: "Not authorized" });
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
         res.status(200).json({
            message: "Event updated succesfully",
            updatedEvent:updatedEvent
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Error" });
    }
}

const deleteEvent = async (req, res) => {
    
    try{
        const id=req.params.id;
        const event=await Event.findById(id);
        if(!event)
            return res.status(404).json({message:"Event not found"});
        if(event.createdBy.toString()!==req.user.userId)
            return res.status(403).json({message:"Not authorized"});
        const deletedEvent=await Event.findByIdAndDelete(id);
        res.status(200).json({
            message:"Event deleted",
            deletedEvent:deletedEvent
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Error"});
    }
}

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };