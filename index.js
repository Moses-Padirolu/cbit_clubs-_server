const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Hackathon = require("./models/hackathons");
const ClubRegister = require("./models/clubregistration");
const ClubMember = require("./models/clubmembers");
const hackathonApplication = require("./models/hackregistrations");

const app = express();
app.use(cors());
app.use(express.json());

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// mongoose.connect("mongodb://127.0.0.1:27017/CbitClub");

mongoose.connect('mongodb+srv://moses:4sHBmhoEMq4YKePr@cluster0.fdpmdnc.mongodb.net/?retryWrites=true&w=majority', connectionParams)
    .then(() => {
        console.info("connected to the DB");
    })
    .catch((e) => {
        console.log("Error: ",e);
    })

// app.use(express.json());
// authenticateJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
app.post("/auth", async (req, res) => {
  try {
    const { name, password } = req.body;
    const existingUser = await ClubMember.findOne({ name });
    if (existingUser.passcode == password) {
      res.json(1);
    } else {
      res.json(0);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/createHackathon", (req, res) => {
  Hackathon.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/clubRegistration", (req, res) => {
  ClubRegister.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/hackathonApplication", (req, res) => {
  hackathonApplication
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/createMember", (req, res) => {
  ClubMember.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/updateParticipants/:id", (req, res) => {
  const id = req.params.id;
  Hackathon.findByIdAndUpdate(
    { _id: id },
    {
      participants: req.body.participants,
    }
  )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getClubRegistration", (req, res) => {
  ClubRegister.find({})
    .then((hackathon) => res.json(hackathon))
    .catch((err) => res.json(err));
});

app.get("/getApplication/:id", (req, res) => {
  const id = req.params.id;
  ClubRegister.findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getHackathon", (req, res) => {
  Hackathon.find({})
    .then((hackathon) => res.json(hackathon))
    .catch((err) => res.json(err));
});

app.get("/getOneHackathon/:id", (req, res) => {
  const id = req.params.id;
  Hackathon.findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getClubMembers", (req, res) => {
  ClubMember.find({})
    .then((members) => res.json(members))
    .catch((err) => res.json(err));
});

app.delete("/deleteHackathon/:id", (req, res) => {
  const id = req.params.id;
  Hackathon.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/deleteApplication/:id", (req, res) => {
  const id = req.params.id;
  ClubRegister.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
