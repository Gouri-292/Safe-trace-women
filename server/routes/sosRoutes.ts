import express, { Response } from 'express';
import Alert from '../models/Alert';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/sos/trigger
// @desc    Trigger an SOS alert
router.post('/trigger', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { latitude, longitude, batteryLevel } = req.body;

    const alert = new Alert({
      user: req.user._id,
      location: {
        latitude,
        longitude,
      },
      batteryLevel,
      status: 'active',
    });

    const createdAlert = await alert.save();
    res.status(201).json(createdAlert);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/sos/update-location
// @desc    Update location for active SOS
router.put('/update-location/:id', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, batteryLevel } = req.body;
    
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      res.status(404).json({ message: 'Alert not found' });
      return;
    }

    if (alert.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    alert.location.latitude = latitude;
    alert.location.longitude = longitude;
    if (batteryLevel !== undefined) {
      alert.batteryLevel = batteryLevel;
    }

    const updatedAlert = await alert.save();
    res.json(updatedAlert);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/sos/resolve/:id
// @desc    Resolve an SOS alert
router.post('/resolve/:id', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      res.status(404).json({ message: 'Alert not found' });
      return;
    }

    if (alert.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    alert.status = 'resolved';
    const updatedAlert = await alert.save();
    res.json(updatedAlert);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
