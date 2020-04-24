const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
// load chef model
const Chef = require("../../models/Chef");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  
  // Form validationconst
  var a = validateRegisterInput(req.body);
  // { errors, isValid } = a;
  errors = a.errors;
  isValid = a.isValid;
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Chef.findOne({ email: req.body.email }).then(chef => {
    if (chef) {
      return res.status(400).json({ email: "Email already exists" });
    } 
    else {
       const newChef = new Chef({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        address: req.body.address
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newChef.password, salt, (err, hash) => {
          if (err) throw err;
          newChef.password = hash;
          newChef
            .save()
            .then(chef => res.json(chef))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validationconst
  var b = validateLoginInput(req.body);
  errors = b.errors;
  isValid = b.isValid;
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Chef.findOne({ email }).then(chef => {
    // Check if user exists
    if (!chef) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, chef.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: chef.id,
          name: chef.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } 
      else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/allchefs",(req,res)=>{
  Chef.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      var temp = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        booked: user.booked,
      }
      userMap[user._id] = temp;
    });

    res.send(userMap);  
  });
})

router.post("/accept",(req,res)=>{
    const cid = req.body.chefId;
    uid = req.body.userid;
    Chef.findByIdAndUpdate({_id:cid},{
      booked: true,
      // $set: { requests: [{userid:uid}] } 
      // requests = [{userid: uid}]
    },function(err,model){
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
  });
});

router.post("/cancel",(req,res)=>{
  const cid = req.body.chefId;
  const uid = req.body.userId; 
   Chef.findByIdAndUpdate({ _id: cid},

     {booked: false,
      $pull: { requests: { userid: uid } } },function(err,model){       
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
  });
  });


module.exports = router;

