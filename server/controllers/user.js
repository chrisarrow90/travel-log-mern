import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) return res.status(403).json({ message: 'Username or password is incorrect' })

    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch)
      return res.status(403).json({ message: 'Username or password is incorrect' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'replace with secret key',
      { expiresIn: '1h' }
    )
    res.status(200).json({ result: existingUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Backend server error' })
  }
}

export const signUp = async (req, res) => {
  console.log('hitting backend')
  const { email, password, firstName, lastName, confirmPassword } = req.body
  try {
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'User with that email already exists' })

    if (password !== confirmPassword)
      return res.status(409).json({ message: 'Passwords do not match' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    })

    const token = jwt.sign({ email: result.email, id: result._id }, 'replace with secret key', {
      expiresIn: '1h'
    })

    res.status(200).json({ result, token })
  } catch (err) {
    res.status(500).json({ message: 'Backend server error' })
  }
}
