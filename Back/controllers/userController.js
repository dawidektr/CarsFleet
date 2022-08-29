const db = require('../models')
const bcrypt = require("bcrypt");

const User = db.users


const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET
  );

  return accessToken;
};

const validateToken = (req, res, next) => {


  const accessToken = req.cookies["access-token"];

  if (!accessToken) return res.status(400).json({ error: "Niezalogowany" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};




const register = async (req, res) => {

  let checkUsers = await User.findOne({ where: { email: req.body.email } })

  if (checkUsers) {
    return res.status(409).json({
      error: "User o podanym emailu istnieje. Spróbuj inny email",
    });

  }


  const hash = await bcrypt.hash(req.body.password, 10);
  let info = {
    userName: [req.body.name, req.body.surname].join(' '),
    email: req.body.email,
    password: hash,
  }

  const user = await User.create(info)
  return res.status(200).send(user)
}



const login = async (req, res) => {

  const user = await User.findOne({ where: { email: req.body.email } })

  if (!user) {
    return res.status(401).json({ error: "Użytkownik o podanym emailu nie istnieje" });
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    return res.status(401).json({ error: "Podane hasło jest nieprawidłowe" })
  }

  const accessToken = await createTokens(user);
  res.cookie("access-token", accessToken, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    httpOnly: true,
  });

  res.status(201).end()
}

const auth = async (req, res) => {
  res.status(200).end();
}





module.exports = {
  register,
  login,
  validateToken,
  auth

}










