const express = require('express');
const User =  require('./models/User.js');
const { sequelize } = require('./config/globals.js')

const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const port = 8080;


//TODO
// connect to database
// POST REGISTER
//  {
//   "username": string,
//   "password": string
//  }
// POST LOGIN

const test = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    }catch(error){
        console.error('Unable to connect to the database:' , error);
    }
};


app.get('/', (req, res) => {
    test()
    res.status(200).send();
});

app.post('/register', async (req, res) =>{
    //check if values exist
    console.log(req.body);
    const {username, password} = req.body;
    if(username && password){
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser = User.create({username, password: hashedPassword });
            res.status(200).send("Registration successful!");

        }catch(error){
            res.status(500);
            console.error('Error with registration',error );
        }
    }else {
        res.status(400).send("Username and password are required.");
    }

});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const currentUser = await User.findOne({
            where: {
                username: username
            }
        });

        if (currentUser) {
            const isPasswordValid = await bcrypt.compare(password, currentUser.password);
            if (isPasswordValid) {
                res.status(200).send("Login Successful");
            } else {
                res.status(401).send("Invalid credentials");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }

});


sequelize.sync().then(()=>{

    app.listen(port, () =>{
        console.log(`The server is listening on ${port}`);
    });
    
})


