const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const userExits = User.findOne({
    username: body.username,
  });

  if (userExits) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User registered successfully",
    token,
  });
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({_id: req.user.id,}, body);


  res.json({
    message: "Updated successfully",
  });
});

router.put("bulk", async (req, res) => {
   const filter = req.query.filter || "";

   const user = await User.find({
    $or:[
      {
        firstName:{
          "$regex": filter
        }
      },
      {
        lastName:{
          "$regex": filter
        }
      }
    ]
   })

   res.json({
    user: users.map(user=> ({
      username:user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id:user._id
    }))
   })



})


module.exports = router;
