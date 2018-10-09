import jwt from 'jsonwebtoken';

const generateToken = ({ name, email }) => jwt.sign(
  {
    name,
    email
  },
  process.env.MY_SECRET
);

export default generateToken;
