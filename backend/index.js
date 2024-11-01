import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" /// AUTHENTICATION STEP NEEDED

// Dotenv helps us not use directly our login info for the database
// Instead we put that info into variables in a .env file in the root directory of the project
// And use those var to log us in the DB
dotenv.config({ path: '../.env'});

//Creation of the express.js app, that will help us handle requests and responses
//Between the client and thebackends
const app = express()

//Make the express app listen for requests on port 8800 (chosen randomly)
//It will allow us to access our backend app via a web browser on http://localhost:8800
app.listen(8800, () =>{
    console.log("Connected to backend !")
})


//Import the database 
const db = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

//Check if there is any error connecting to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database!")
})

//Express middleware allowing to send json from the client
app.use(express.json());

//CORS allows the backend to permit the frontend to make requests since they are hosted on diff ports
app.use(cors())


////////////////////////////////////////////
//Company-related requests management 

//create a route that listens for get requests to /companies URL and queries the db to return
//all the content of the "companies" table
app.get("/companies", (req, res) => {
    const q = "SELECT * FROM companies"
    db.query(q,(err,data)=>{
        if(err) return res.json("error")
        return res.json(data)
    })
})

//route for requests to add a new company 
app.post("/companies", (req,res) => {
    const q = "INSERT INTO companies (`name`, `description`, `website`, `email`, `location`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.description,
        req.body.website,
        req.body.email,
        req.body.location,
    ]

    db.query(q, [values], (err,data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error : "Erreur lors de la création de l'entreprise"})
        }
        return res.status(200).json({companyId: data.insertId});
    })
})

//route for requests to get info from a specific company 
app.get("/companies/:id", (req,res) => {
    const companyId = req.params.id
    const q = "SELECT * FROM companies WHERE id = ?"

    db.query(q, companyId, (err,data)=>{
        console.log(data)
        if(err) return res.json("error")
        return res.json(data)
    })
})

//route for requests to update a specific company 
app.put("/companies/:id", (req,res) => {
    const companyId = req.params.id
    const q = "UPDATE companies SET `name` = ?, `description` = ?, `website` = ?, `email` = ?, `location` = ? WHERE id = ?"

    const values = [
        req.body.name,
        req.body.description,
        req.body.website,
        req.body.email,
        req.body.location,
    ]
    
    db.query(q, [...values, companyId], (err,data) =>{
        if (err) return res.json(err);
        return res.json("Company has been updated successfully");
    })
})
///////////////////////////////////////////////////////////////////
//Job-Offer-related requests management 

//route for requests to get all Job Offers
app.get("/ads", (req, res) => {
    const q = "SELECT * FROM advertisements"
    db.query(q,(err,data)=>{
        if(err) return res.json("error")
        return res.json(data)
    })
})

//route for requests to create a new Job Offer
app.post("/ads", (req, res) => {
    const q = "INSERT INTO advertisements (`title`,`description`,`location`, `salary`, `contract_type`, `companyId`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.location,
        req.body.salary,
        req.body.contract_type,
        req.body.companyId,
    ];

    db.query(q, [values], (err,data) => {
        if(err) {
            console.error(err);
            return res.json({ error: err.message });
        } 
        return res.json("user has been created")
    })
})

//route for request to delete a specific Job Offer
app.delete("/ads/:id", (req,res)=>{
    const adId = req.params.id
    const q = "DELETE FROM advertisements WHERE id = ?"

    db.query(q, [adId], (err,data) =>{
        if (err) return res.json(err);
        return res.json("Ad has been deleted successfully");
    })
})

//route for request to get a specific Job Offer
app.get("/ads/:id", (req, res) => {
    const adId = req.params.id
    const q = "SELECT * FROM advertisements WHERE id = ?"

    db.query(q, [adId], (err,data)=>{
        if(err) return res.json("error")
        return res.json(data[0])
    })
})

//route for request to update a specific Job Offer
app.put("/ads/:id", (req,res)=>{
    const adId = req.params.id
    const q = "UPDATE advertisements SET `title` = ?, `description` = ?, `location` = ?, `salary` = ?, `contract_type` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.description,
        req.body.location,
        req.body.salary,
        req.body.contract_type,
    ]
    db.query(q, [...values, adId], (err,data) =>{
        if (err) return res.json(err);
        return res.json("Ad has been updated successfully");
    })
})


////////////////////////////////////////////////////////////////////////////
//User-related requests management

//route for requests to create new user with password encryption
app.post("/users", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const q = "INSERT INTO users (`firstName`,`lastName`,`username`,`password`,`email`,`phone`,`adresse`,`role`) VALUES (?)";
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            hashedPassword,
            req.body.email,
            req.body.phone || null,
            req.body.adresse || null,
            req.body.role,
        ];

        db.query(q, [values], (err,data) => {
            if(err) {
                console.error("Database error:" ,err);
                return res.status(500).json({ error: err.message });
            } 
            return res.json("user has been created")
        })
    }   catch (err) {
        console.error(err);
        return res.status(500).json({error : "Server error"})
    } 
})



//Route for request to update a specific user
app.put("/users/:id", (req,res) => {
    const userId = req.params.id
    const q = "UPDATE users SET `firstName` = ?, `lastName` = ?, `username` = ?, `email` = ?, `phone` = ?, `adresse` = ?, `companyId` = COALESCE(?, `companyId`) WHERE id = ?"

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.email,
        req.body.phone,
        req.body.adresse,
        req.body.companyId || null,
    ]
    
    db.query(q, [...values, userId], (err,data) => {
        if (err) return res.json(err)
        return res.json("User has been successfully updated");
    })
})

////////////////////////////////////////////////////////////////////////
//Applications-related requests management
//route for requests to archive applications from users
app.post("/applications", (req, res) => {
    const q = "INSERT INTO applications (`firstName`,`lastName`, `email`, `phone`, `message`, `adId`, `userId`) VALUES (?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.message,
      req.body.adId,
      req.body.userId,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur lors de l'envoi de la candidature" });
      }
      return res.status(200).json({ message: "Candidature envoyée avec succès" });
    });
  });




////////////////////// Authentication system with JWT tokens ////////////////////////////////////////////////

let refreshTokenS = [] //Delete this when the session is done (don't really know how for now)
console.log(refreshTokenS)

//Takes the refresh token from the front check if the token is valid!
app.post("/refresh", (req,res)=>{
    //take the refresh token from the user
    const refreshToken = req.body.token; //You can create a DB for refresh tokens

    console.log(refreshTokenS)
    
    //send error if there is no token or if it's not valid
    if(!refreshToken) return res.status(401).json("You are not authenticated !")
    //if everything ok, create new access token, refresh token and send to user 
    // if(!refreshTokenS.includes(refreshToken)){
    //     return res.status(403).json("Refresh Token is not valid")
    // }
    // //verify the token with the secret key
    // jwt.verify(refreshToken, "myRefreshSecretKey", (err,user)=>{
    //     err && console.log(err);

    //     //remove the old token from the array 
    //     refreshTokenS = refreshTokenS.filter((token) => token !== refreshToken);

    //     //Create new tokens
    //     const newAccessToken = generateAccessToken(user)
    //     const newRefreshToken = generateRefreshToken(user)

    //     //Add the new refresh token to the array
    //     refreshTokenS.push(newRefreshToken)

    //     //Send the two new tokens to the user
    //     res.status(200).json({
    //         accessToken: newAccessToken,
    //         refreshToken: newRefreshToken,
    //     })
    // })
    const q = "SELECT * FROM refreshTokens WHERE token = ?"
    db.query(q, [refreshToken], (err,data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(403).json("Refresh token is not valid")

        jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
            if (err) return res.status(500).json("Token is not valid")
            
            const deleteQuery = "DELETE FROM refreshTokens WHERE token = ?";
            db.query(deleteQuery, [refreshToken], (err) => {
                if (err) return res.status(500).json(err);

                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);

                const insertQuery = "INSERT INTO refreshTokens (userId, token) VALUES (?, ?)";
                db.query(insertQuery, [user.id, newRefreshToken], (err) => {
                    if (err) return res.status(500).json(err)
                    
                    res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });
                });
            });
        });
    });
});

//Access token generation
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
    "mySecretKey", //CREATE BETTER SECRET KEY IN .ENV FILE
    {expiresIn: "2d"})
}

//refresh token generation
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
    "myRefreshSecretKey",
    {expiresIn: "30s"}) //CREATE BETTER SECRET KEY IN .ENV FILE
}

//Route for requests to login, checks if the username is valid and then check if the password match the one in the DB
//If it does, generate both access and refresh tokens and then return all data that will be stored in localStorage
app.post("/login", (req,res)=>{
   const { username, password } = req.body
   const q = "SELECT * FROM users WHERE username = ?"

   db.query(q,[username, password], async (err,data) => {
        if (err) return res.status(500).DB_NAMEjson(err);

        if (data.length === 0){
            return res.status(400).json("Username or password is incorrect");
        }
    

        const user=data[0];

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            //GENERATE REFRESH AND ACCESS TOKEN
            const accessToken = generateAccessToken(user);

            const refreshToken = generateRefreshToken(user);
            const q = "INSERT INTO refreshTokens (userId, token) VALUES (?, ?)"
            db.query(q, [user.id, refreshToken], (err,data) => {
                if (err) return res.status(500).json(err)
                return res.json({
                    id: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    adresse: user.adresse,
                    role: user.role,
                    companyId: user.companyId,
                    accessToken,
                    refreshToken
                })
            })
            refreshTokenS.push(refreshToken);//Put the rToken inside the array
            console.log(refreshTokenS)
            
        }else{
            res.status(400).json("Username or password incorrect")
        }

    });
});

///////////////////EXPIRATION REFRESH TOKEN//////////////

//Verification function to check if the user is correctly authenticated
//Can be used to authorize the user to do certain things or log out (for example)
const verification = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err,user) =>{
            if(err){
                return res.status(403).json("Token is not valid");
            }

            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!");
    }
}

//Logout function
app.post("/logout", verification, (req,res)=>{
    const refreshToken = req.body.token;
    
    const q = "DELETE FROM refreshTokens WHERE token = ?"

    db.query(q, [refreshToken], (err) => {
        if (err) return res.status(500).json(err)
            
        res.status(200).json("You logged out successfully")
    })
    
})
//-----UPDATEUSER.JSX-----
//recupere les informations de la personne connecté

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(result[0]);
    });
});


app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, username, phone, adresse } = req.body;

    const query = `
        UPDATE users 
        SET 
            firstName = COALESCE(?, firstName),
            lastName = COALESCE(?, lastName),
            username = COALESCE(?, username),
            phone = COALESCE(?, phone),
            adresse = COALESCE(?, adresse)
        WHERE id = ?;
    `;
    const values = [firstName, lastName, username, phone, adresse, id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
});

//-----UPDATEUSER.JSX-----

app.get('/applications', (req, res) => {
    const query = 'SELECT * FROM applications ';

    db.query(query, (err, data) => {
        if (err) {
            console.error('Erreur lors de la récupération des demandes :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des demandes' });
        }
        res.status(200).json(data);
    });
});
