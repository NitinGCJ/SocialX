const mongoose=require("mongoose")
const uri = 'mongodb://localhost:27017/userdata'; // Replace 'mydatabase' with your database name
const {JWT_SECRET}=require ("./config");
const jwt =require ("jsonwebtoken")
mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        bio:String,
        profilepic:String

    });
const User = mongoose.model('User', userSchema);

const friendshipSchema = new mongoose.Schema({
        user1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        user2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    });
    
const Friendship = mongoose.model('Friendship', friendshipSchema);    

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photourl: { type: String },  // URL or path to the photo
    caption: { type: String },
    likes:{type:Number,default:0},
    timestamp: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

const likeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    timestamp: { type: Date, default: Date.now }
});

const Like = mongoose.model('Like', likeSchema);

const signup=async function(username,password){
    const resp=await User.findOne({username})

    if(resp!=null){
        return false;
    }
    else{
    const user = new User({ username, password });
    await user.save();
    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET)

    return {
        token:token,
        result:true
    }
    }
}
const signin=async function(username,password){
    const resp=await User.find({username:username,password:password})
    console.log(resp)
    if(resp.length==0){
        return false;
    }
    else{
        const token=jwt.sign({userId:resp[0]._id},JWT_SECRET)
        return {message:true,
            token:token
        };
    }
}

module.exports={
    signup,
    signin,
    User,
    Like,
    Friendship,
    Post
}



