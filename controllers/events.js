const Event = require('../models/Event');
const { response } = require('express');


const getEvents = async (req, res= response)=>{

    const events = await Event.find()
                              .populate('user', 'name')  

    res.status(200).json({
        ok:true,
        events
    })

}

const createEvents = async(req, res= response)=>{

   const event = new Event(req.body);

   try {

    event.user = req.uid;

    const eventDb = await event.save();

    res.status(200).json({
        ok:true,
        event:eventDb
    })
       
   } catch (error) {
    res.status(500).json({
        ok:true,
        msg:'something wrong'
    })
   }

   
}

const updateEvents = async(req, res= response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event no found'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You cant update this event'
            })
        }

        const newEvent ={
            ...req.body,
            user:uid
        }

        const  evetUpdate = await Event.findByIdAndUpdate(eventId, newEvent,{ new:true });

        res.status(200).json({
            ok:true,
            event: evetUpdate
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msh:'Something wrong'
        })
    }
    

    res.status(200).json({
        ok:true,
        msg:'updateEvents'
    })
}

const deleteEvents = async (req, res= response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event no found'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You cant delete this event'
            })
        }

        const  eventDelete = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok:true,
            msg:'Event Deleted'
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msh:'Something wrong'
        })

    }

}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}