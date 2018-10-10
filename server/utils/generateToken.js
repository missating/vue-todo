import jwt from 'jsonwebtoken';

const generateToken = ({ _id, name }) => jwt.sign(
  {
    _id,
    name
  },
  process.env.MY_SECRET
);

export default generateToken;
