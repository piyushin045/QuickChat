import Message from "../models/message.js"
import User from "../models/User.js"

// get all the users expect the logged in user

export const getUserForSidebar = async(req,res)=>{
    try {
        const userId = req.user._id
        const filterUsers = await User.find({_id:{$ne: userId}})
        .select("-password")

        // count the number of message not seen
        const unseenMessages = {}
        const promises = filterUsers.map(async(user)=>{
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length > 0 ){
                unseenMessages[user._id] = messages.length
            }
        })

        await promise.all(promises)
        res.json({sucess: true, user: filterUsers, unseenMessages})
    } catch (error) {
        console.log(error.message)
        res.json({sucess: false, message: error.message})
        
    }
}