import prisma from '../config/db.js';

export const createUser = async (req, res) => {
  try {
    const { id, email_address, username } = req.body;
    
    const user = await prisma.user.upsert({
      where: { id: id },
      update: {
        email: email_address,
        name: username || 'User',
        updatedAt: new Date()
      },
      create: {
        id,
        clerkId: id,
        email: email_address,
        name: username || 'User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}