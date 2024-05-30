const mongoose=require("mongoose")
const uri = 'mongodb://localhost:27017/userdata'; // Replace 'mydatabase' with your database name

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
    });

const User = mongoose.model('User', userSchema);

const signup=async function(username,password){
    const resp=await User.findOne({username})

    if(resp!=null){
        return false;
    }
    else{
    const user = new User({ username, password });
    await user.save();
    return true
    }
}

module.exports={
    signup
}



