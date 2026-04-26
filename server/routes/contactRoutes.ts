import express, { Response } from 'express';
import Contact from '../models/Contact';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contacts for logged in user
router.get('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/contacts
// @desc    Add a new contact
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, relation } = req.body;

    const contact = new Contact({
      user: req.user._id,
      name,
      phone,
      relation,
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
router.delete('/:id', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    // Make sure user owns the contact
    if (contact.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
