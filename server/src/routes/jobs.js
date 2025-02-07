import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { 
  getAllJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob ,
  getMyJobs
} from '../controllers/jobController.js';


const router = express.Router();

router.get('/', getAllJobs);
router.get('/myjobs/:userId',requireAuth, getMyJobs);
router.get('/:id', getJob);
router.post('/', requireAuth, createJob);
router.put('/:id', requireAuth, updateJob);
router.delete('/:id', requireAuth, deleteJob);

export default router;