import { ROLES } from "../models/Roles";
import User from "../models/User";

export const checkUserEmail = async (req, res, next) => {

  console.log(req.body)

  const user = await User.findOne({username : req.body.username})
  console.log(user)
  if (user) return res.status(400).json({message: 'El usuario ya existes!'})

  const email = await User.findOne({email: req.body.email})
  if (email) return res.status(400).json({message: 'El email ya existe!'})

  next()
}

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `roles ${req.body.roles[i]} no validos!`,
        });
      }
    }
  }
  next();
};
