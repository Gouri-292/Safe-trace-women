import express, { Response } from 'express';
import Alert from '../models/Alert';
import { protect, admin, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/admin/alerts
// @desc    Get all active alerts
// @access  Private
router.get('/alerts', protect, async (req: AuthRequest, res: Response) => {
  try {
    const alerts = await Alert.find({ status: 'active' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/all-alerts
// @desc    Get all alerts (history) regardless of status
// @access  Private
router.get('/all-alerts', protect, async (req: AuthRequest, res: Response) => {
  try {
    const alerts = await Alert.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
