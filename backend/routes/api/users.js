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
const Chef = require('../../models/Chef');



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
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } 
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile:req.body.mobile
      });
      console.log(newUser);

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
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
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
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
              token: token
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




router.post("/select",(req,res)=>{
  const cid = req.body.chefId; 
  const uid = req.body.userId; 
   Chef.findByIdAndUpdate({ _id: cid},
     {$push: { requests: {  userid: uid } } },function(err,model){       
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
  // const removeit=requests:{$elemMatch:{userid: uid}};
  // console.log(removeit);
   Chef.findByIdAndUpdate({ _id: cid},

     {$pull: { requests: { userid: uid } } },function(err,model){       
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
  });
  });

 


module.exports = router;

