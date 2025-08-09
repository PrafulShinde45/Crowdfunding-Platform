import { NextResponse } from 'next/server'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export async function POST(request) {
  try {
    console.log('Signup attempt started')
    await connectDb()
    console.log('Database connected successfully')
    
    const body = await request.json()
    const name = body?.name?.trim()
    const email = body?.email ? String(body.email).toLowerCase().trim() : undefined
    const username = body?.username?.trim()
    const password = body?.password
    console.log('Received signup data:', { name, email, username, passwordLength: password?.length })

    // Validate input
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    console.log('Checking for existing user...')
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      console.log('User already exists:', existingUser.email)
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    // Create new user
    console.log('Creating new user...')
    const newUser = await User.create({
      name,
      email,
      username,
      password // In a real app, you'd hash this password
    })
    console.log('User created successfully:', newUser._id)

    // Test: Immediately try to find the user we just created
    const testUser = await User.findOne({ email })
    console.log('Test query - User found after creation:', testUser ? 'YES' : 'NO')
    if (testUser) {
      console.log('Test query - Password match:', testUser.password === password ? 'YES' : 'NO')
      console.log('Test query - Email match:', testUser.email === email ? 'YES' : 'NO')
      console.log('Test query - Stored email:', testUser.email)
      console.log('Test query - Provided email:', email)
    }

    return NextResponse.json(
      { message: 'User created successfully', user: { id: newUser._id, email: newUser.email, username: newUser.username } },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error details:', error)
    if (error?.code === 11000) {
      // Duplicate key error (unique index violation)
      const duplicateField = Object.keys(error.keyPattern || {})[0] || 'field'
      return NextResponse.json(
        { message: `User with this ${duplicateField} already exists` },
        { status: 400 }
      )
    }
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}
