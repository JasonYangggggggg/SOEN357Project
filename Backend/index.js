const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,  
}));
app.use(session({
    secret: 'your-secret-key',  
    resave: false,              
    saveUninitialized: true,   
    cookie: {
        httpOnly: true,         
        secure: false,          
        maxAge: 1000 * 60 * 60  
    }
}));

app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/SOEN357', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB:", err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String,
    OnlineSession: String,
    Authendicate: String,
    Listing: [{ type: Object }],         
    BoughtItem: [{ type: Object }],         
    IfAdminPendingApprovalList: [{ type: Object }]
}));

const ItemList = mongoose.model('ItemList', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    ItemName:String,
    HowNew: String,
    Province: String,
    Area:String
}));


app.get("/helloworld",(req,res)=> {
    res.json({"message":"reach to the point"});
})

app.get("/check-session", async(req, res) => {
    if(req.session.user){
        console.log("here data set");
        if(req.session.user.role === "admin"){
            const userDATA = await User.findOne({ role: 'admin' });
            returnData = {
                "message":"Login Success",
                "Data":req.session.user,
                "UserData":userDATA
                
            }
            res.json(returnData);
        }
        else{
        const responsedata = {
            "message":"Login Success",
            "Data": req.session.user
        }
        res.json(responsedata);
    }
    }
    else{
    res.json({ message: "Invalid Login" });
    }
});

app.post("/register", async (req, res) => {
    try {
      console.log(req.body);
      let { username, password, role } = req.body;
      console.log(password);
      const hashpassword = await bcrypt.hash(password, 10);
      console.log(hashpassword);
      if (role === "admin") {
        const RegisterUser = new User({
          username,
          password: hashpassword,
          role,
        });
        await RegisterUser.save();
      } else {
        const RegisterUser = new User({
          username,
          password: hashpassword,
          role,
          Authendicate: "False",
        });
        await RegisterUser.save();
      }
      res.json({ message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }



});

app.post("/Login", async (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.status(400).json({ message: "User not exists" });
    }
    else{
     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
     if(isPasswordValid){
        req.session.user = { username: username, role: existingUser.role};
        res.json({ message: "login success" });

     }
     else{
        res.json({ message: "login failed" });
     }
    }
    
   
   });

app.post("/Logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to log out" });
        }

        res.clearCookie("connect.sid"); 

        res.json({ message: "Logged out successfully" });
    });
});

app.post("/SendToVerify",async(req,res) => {
    const { formData, username } = req.body;
  
    if (!formData || !username) {
      return res.status(400).json({ message: 'Form data and username are required' });
    }
  
    try {
     
      const adminUser = await User.findOne({ role: 'admin' });
  
      if (!adminUser) {
        return res.status(404).json({ message: 'no admin user' });
      }

      adminUser.IfAdminPendingApprovalList.push({
        username,   
        formData     
      });
  
      
      await adminUser.save();
  
      res.status(200).json({ message: 'Form data sent success' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }

});


app.post("/approveOrReject", async(req,res) => {

    const { username, action,CurrentUserName } = req.body;
    if(action === "reject"){
        const userData = await User.findOne({ username: username });
        userData.Authendicate = "False";
        const CurrentUser = await User.findOne({ username: CurrentUserName});
        if (CurrentUser && CurrentUser.IfAdminPendingApprovalList) {
           
            const indexToRemove = CurrentUser.IfAdminPendingApprovalList.findIndex(item => item.username === username);
            if (indexToRemove !== -1) {           
              CurrentUser.IfAdminPendingApprovalList.splice(indexToRemove, 1);        
              await CurrentUser.save();
              console.log("Pending approval removed successfully");
            } else {
              console.log("User not found in pending approval list");
            }
          } else {
            console.log("Current user or approval list not found");
          }
          await userData.save();
          res.json({ message: 'Reject User' });
    }
    else if(action === "approve"){
        const userData = await User.findOne({ username: username });
        userData.Authendicate = "True";
        const CurrentUser = await User.findOne({ username: CurrentUserName});
        if (CurrentUser && CurrentUser.IfAdminPendingApprovalList) {
           
            const indexToRemove = CurrentUser.IfAdminPendingApprovalList.findIndex(item => item.username === username);
            if (indexToRemove !== -1) {           
              CurrentUser.IfAdminPendingApprovalList.splice(indexToRemove, 1);        
              await CurrentUser.save();
              console.log("Pending approval removed successfully");
            } else {
              console.log("User not found in pending approval list");
            }
          } else {
            console.log("Current user or approval list not found");
          }
          await userData.save();
          res.json({ message: 'Approve Success' });


        
    }
    else {
        res.json({ message: 'Something is wrong' });
    }
});


app.post("/CheckAuth", async(req,res)=>{
    const {CurrentUserName} = req.body;
    const userData = await User.findOne({ username: CurrentUserName });
    console.log(CurrentUserName);
    res.json({message:userData.Authendicate});
});

app.post("/ListItems", async(req,res)=> {
    try {
        const { formData, username } = req.body;

        if (!formData || !username) {
            return res.status(400).json({ message: "Missing form data or username" });
        }

        const newItem = new ItemList({
            username: username, 
            ItemName: formData.name,
            HowNew: formData.new,
            Province: formData.province,
            Area: formData.area,
        });

        
        await newItem.save();
        res.json({ message: "Item successfully added!" });
    } catch (error) {
        console.error("Error adding item:", error);
        res.json({ message: "Server error, could not add item." });
    }
});

app.get("/AllListing", async(req,res)=> {
    try {
        const listings = await ItemList.find();
        res.json({ listings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.json({ message: "There was an error fetching the listings" });
    }
})
   

app.listen(3001, ()=>{
    console.log("server listen in port 3001");
})