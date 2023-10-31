const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const getAllUsers = async (req, res) => {
 return res.status(200).json({
    msg: "I'm in the user route"
  });
};

const postUser = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
         return res.status(200).json({
            new_User:"Congratulations! User Created"
          });
        })
        .catch(err => {
          if (err.code === 11000) {
            res.status(400).json({
              error: "Email already exists."
            });
          } else {
           return res.status(500).json({
              error: err
            });
          }
        });
    }
  });
};


// const loginUser = async (req, res) => {
// //     console.log("login user");
//         User.find({email: req.body.email})
//         .exec()
//         .then (user =>{
//             if (user.length < 1) {
//                 return res.status(400).json({
//                     msg: "Email not Found. Try to SignUp first."
//                 })
//             }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
//                 if(!result) {
//                    return res.status(401).json({
//                         msg : "Password authentication failed" 
//                     })
//                 } 

//                 if (result) {
//                     const token = jwt.sign({
//                             name: user[0].name,
//                             email: user[0].email
//                     },'This is dummy user', 
//                     {
//                         expiresIn: "24hr"
//                     });
//                   return  res.status(200).json({
//                         name: user[0].name,
//                         email: user[0].email,
//                         token: token

//                     })
                  
//                 }
//             })
//          })
//          .catch(err =>{
//             res.status(500).json({
//                 err: err
//             })
//          })
// }


// const loginUser = async (req, res) => {
//   User.find({ email: req.body.email }).lean()
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(400).json({
//           msg: "Email not Found. Try to SignUp first."
//         });
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (!result) {
//           return res.status(401).json({
//             msg: "Password authentication failed"
//           });
//         }

//         if (result) {
//           const token = jwt.sign(
//             {
//               name: user[0].name,
//               email: user[0].email
//             },
//             'This is dummy user',
//             {
//               expiresIn: "24hr"
//             }
//           );


//           user[0]
//             .save()
//             .then(() => {
//               return res.status(200).json({
//                 name: user[0].name,
//                 email: user[0].email,
//                 token: token,
//                 cart: user[0].cart
//               });
//             })
//             .catch((saveErr) => {
//               return res.status(500).json({
//                 err: saveErr
//               });
//             });
//         }
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         err: err
//       });
//     });
// };


const loginUser = async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          msg: "Email not Found. Try to SignUp first."
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: "Password authentication failed"
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email
            },
            'This is dummy user',
            {
              expiresIn: "24hr"
            }
          );

          const updatedUser = new User(user);   
          updatedUser.cart = user.cart;
          updatedUser
            .save()
            .then(() => {
              return res.status(200).json({
                name: user.name,
                email: user.email,
                token: token,
                cart: user.cart,
                message:"Login Successfull!"
              });
            })
            .catch((saveErr) => {
              return res.status(500).json({
                err: saveErr
              });
            });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        err: err
      });
    });
};

module.exports = { getAllUsers, postUser, loginUser };
