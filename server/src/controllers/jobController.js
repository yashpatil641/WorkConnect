import prisma from '../config/db.js';


export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { 
        company: true,
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
export const getMyJobs = async (req, res) => {
  const userId  = req.params.userId;
  console.log(userId)
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: userId },
      include: { 
        company: true,
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
export const getJob = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: { 
        company: true,
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

export const createJob = async (req, res) => {
  try {
    const { title, type, description, salary, location, company } = req.body;
    const userId = req.body.userId; // Get from Clerk auth

    const job = await prisma.job.create({
      data: {
        title,
        type,
        description,
        salary,
        location,
        published: true,
        postedBy: {
          connect: { id: userId }
        },
        company: {
          create: {
            name: company.name,
            description: company.description,
            contactEmail: company.contactEmail,
            contactPhone: company.contactPhone
          }
        }
      },
      include: { 
        company: true,
        postedBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: req.body,
      include: { 
        company: true,
        postedBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};



export const deleteJob = async (req, res) => {
  try {
    await prisma.job.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
};