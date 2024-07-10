const express  = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const router = express.Router();
const { default: mongoose } = require('mongoose');

router.get("/balance", authMiddleware, async (req, res) => {
    try {
      const account = await Account.findOne({
        userId: req.userId
      });
  
      if (!account) {
        return res.status(404).json({
          message: "Account not found for this user",
        });
      }
  
      res.json({
        balance: account.balance
      });
  
    } catch (err) {
      console.error("Error fetching account balance:", err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {success, to} = req.body;
    
    const account = await Account.findOne({
        userId:req.userId
    }).session(session)
    
    if(!account || account.balance< account) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    const toAccount = await Account.findOne({userId: to}).session(session)
    if(!toAccount){
        await session.abortTranction()
        return res.status(400).json({
            message: "User not found"
        })
    }

    await Account.findOne({userId: req.userId}, {$inc:{balance: -amount}}).session(session);
    await Account.findOne({userId: to}, {$inc:{balance:amount}}).session(session)
    
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
    
    
    
})
module.exports = router;