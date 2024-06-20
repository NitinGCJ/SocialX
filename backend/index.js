const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const {signup,signin,User, Post, Friendship,Like}=require ("./database")
const { json } = require("stream/consumers")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("./config")
const multer=require("multer")

const app=express()
app.use(cors())
app.use(express.json())

app.listen(3000,()=>{
    console.log("3000 port listening ")
})
function authmiddleware(req,res,next){
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
        
    }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/Users/nitin/Downloads/DEV PROJECTS/SocialX/frontend/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });
app.post("/upload",upload.single('file'),(req,res)=>{
  console.log("hello")
  if(!req.file){
    console.log("no file uploaded")
  }
   console.log(req.file)
  res.json(req.file)

})
app.post("/signup",async (req,res)=>{
      const username=req.body.username;
      const password=req.body.password;
    
      
      const resp=await signup(username,password)
      if(resp==false){
        res.send({message:false})
      }
      
      else {
        res.send( {message:true,
          token:resp.token
        })
      }
    
})
app.post("/signin",async(req,res)=>{
  const username=req.body.username
  const password=req.body.password
  
  const resp=await signin(username,password)
  
    if(resp==false){
      res.send({message:false})
    }
    
    else {
      res.send( {message:true,token:resp.token})
    }

})
app.post("/update_info",authmiddleware,async(req,res)=>{
  const body=req.body

  await User.updateOne({ _id: req.userId },body);
	
    res.json({
        message: "Updated successfully"
    })

}) 
app.get("/all_users",authmiddleware,async(req,res)=>{
  const friends=await Friendship.find({user1_id:req.userId}).select('user2_id')
  var friendlist=[req.userId]
  for(let i=0;i<friends.length;i++){
    friendlist.push(friends[i].user2_id)
  }
  const users = await User.find({ _id: { $nin: friendlist} }).select('-password');;

  res.json({users:users})
})

app.post("/make_post",authmiddleware,async(req,res)=>{
  console.log("req received")

  const post = new Post({
    user_id:req.userId,
    caption:req.body.caption,
    photourl:req.body.photourl,
    likes:0
    });
  await post.save();
  
  res.json({message:"Successful!"})
})

app.post("/make_friend",authmiddleware,async(req,res)=>{

  const friend=new Friendship({
    user1_id:req.userId,
    user2_id:req.body.user2_id
  })
  await friend.save()

  res.json({message:"Successful!"})
})
app.post("/remove_friend",authmiddleware,async(req,res)=>{

  const result=await Friendship.findOneAndDelete({user1_id:req.userId,user2_id:req.body.user2_id
  })

   res.json({message:"Succesfull!"})
})
app.post("/make_like",authmiddleware,async(req,res)=>{
  const checklike=await Like.find({user_id:req.userId,
    post_id:req.body.post_id})
  if(checklike.length){
    res.json({message:"succesfull"})
  }
  else{
  const like=new Like({
    user_id:req.userId,
    post_id:req.body.post_id
  })
  await like.save()
  var totallikes=await Post.find({_id:req.body.post_id})
  totallikes=totallikes[0].likes+1;
  await Post.updateOne({ _id:req.body.post_id},{likes:totallikes});
  
  res.json({message:"Successful!"})}
  
   
})

app.post("/remove_like",authmiddleware,async(req,res)=>{
  const checklike=await Like.find({user_id:req.userId,
    post_id:req.body.post_id})
  if(!checklike.length){
    res.json({message:"succesfull"})
  }
  else{
  const result=await Like.findOneAndDelete({user_id:req.userId,post_id:req.body.post_id
})

var totallikes=await Post.find({_id:req.body.post_id})
  totallikes=totallikes[0].likes-1;
  await Post.updateOne({ _id:req.body.post_id},{likes:totallikes});
    
    res.json({message:"Successful!"}) 
}})

app.get("/get_friends",authmiddleware,async(req,res)=>{
     const response=await Friendship.find({user1_id:req.userId}).select('user2_id')
     const friends=[]
     for(var i=0;i<response.length;i++){
      const rp=await User.find({_id:response[i].user2_id}).select('-password')
      friends.push(rp[0])
     }
     res.json({friends:friends})
})
app.get("/get_my_posts",authmiddleware,async(req,res)=>{
  const response=await Post.find({user_id:req.userId})
  console.log(req.userId)
  const userresp=await User.find({_id:req.userId})
  const my_posts=[]
  for(var j=0;j<response.length;j++){
    var flag=false
      const likebyme=await Like.find({post_id:response[j]._id,user_id:req.userId})
         if(likebyme.length){
          flag=true
         }
        my_posts.push({
          post_id:response[j]._id,
          name:userresp[0].username,
          profilepic:userresp[0].profilepic,
          photourl:response[j].photourl,
          caption:response[j].caption,
          likes:response[j].likes,
          timestamp:response[j].timestamp,
          likebyme:flag
        })
  }
  my_posts.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
});
res.json({posts:my_posts})
})

app.get("/get_feed",authmiddleware,async(req,res)=>{
  console.log("req recieved")
  const response=await Friendship.find({user1_id:req.userId}).select('user2_id')
  var temp=[]
  for(var i=0;i<response.length;i++){
   const rp=await User.find({_id:response[i].user2_id}).select('-password -_id')
   console.log(rp)
   var postoffriend= await Post.find({user_id:response[i].user2_id})
   
   for(var j=0;j<postoffriend.length;j++){
      var flag=false
      const likebyme=await Like.find({post_id:postoffriend[j]._id,user_id:req.userId})
         if(likebyme.length){
          flag=true
         }
        temp.push({
          post_id:postoffriend[j]._id,
          name:rp[0].username,
          profilepic:rp[0].profilepic,
          photourl:postoffriend[j].photourl,
          caption:postoffriend[j].caption,
          likes:postoffriend[j].likes,
          timestamp:postoffriend[j].timestamp,
          likebyme:flag
        })
   }
  }
  const rp2=await User.find({_id:req.userId}).select('-password -_id')
  var myposts= await Post.find({user_id:req.userId})

  for(var j=0;j<myposts.length;j++){
    var flag=false
      const likebyme=await Like.find({post_id:myposts[j]._id,user_id:req.userId})
      
         if(likebyme.length){
          flag=true
         }
    temp.push({
      post_id:myposts[j]._id,
      name:rp2[0].username,
      profilepic:rp2[0].profilepic,
      photourl:myposts[j].photourl,
      caption:myposts[j].caption,
      likes:myposts[j].likes,
      timestamp:myposts[j].timestamp,
      likebyme:flag
    })
}
  
temp.sort((a, b) => {
  return new Date(b.timestamp) - new Date(a.timestamp);
});

  res.json({feed:temp})
  
})
app.get("/my_info",authmiddleware,async(req,res)=>{
  const resp=await User.find({_id:req.userId})
  res.json({info:resp})
})

app.post("/friend_info",authmiddleware,async(req,res)=>{
  const resp=await User.find({_id:req.body.friend_user_id})
  const totalfriends=await Friendship.find({user1_id:req.body.friend_user_id})
  const totalfriendspost=await Post.find({user_id:req.body.friend_user_id})

  res.json({
    profilepic:resp[0].profilepic,
    username:resp[0].username,
    bio:resp[0].bio,
    totalposts:totalfriendspost.length,
    totalfriends:totalfriends.length
  })
})
app.post("/friend_posts",authmiddleware,async(req,res)=>{


  const response=await Post.find({user_id:req.body.friend_user_id})
  const userresp=await User.find({_id:req.body.friend_user_id})
  const my_posts=[]
  for(var j=0;j<response.length;j++){
    var flag=false
      const likebyme=await Like.find({post_id:response[j]._id,user_id:req.userId})
         if(likebyme.length){
          flag=true
         }
        my_posts.push({
          post_id:response[j]._id,
          name:userresp[0].username,
          profilepic:userresp[0].profilepic,
          photourl:response[j].photourl,
          caption:response[j].caption,
          likes:response[j].likes,
          timestamp:response[j].timestamp,
          likebyme:flag
        })
  }
  my_posts.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
});
res.json({posts:my_posts})

})