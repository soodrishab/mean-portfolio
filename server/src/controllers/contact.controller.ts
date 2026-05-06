import { Request, Response, NextFunction } from 'express';
import { Message } from '../models';
import { sendEmail } from '../utils/email';
import { createError } from '../middleware/errorHandler';

export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw createError('Name, email, and message are required', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError('Invalid email format', 400);
    }

    // Save message to database
    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Contact Form Submission',
      message,
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    // Send email notification (non-blocking)
    sendEmail({
      to: process.env.CONTACT_EMAIL || 'rishabsood9@gmail.com',
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Received at: ${new Date().toISOString()}</small></p>
      `
    }).catch(err => console.error('Failed to send email notification:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: { id: newMessage._id }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { unread } = req.query;

    const filter: Record<string, unknown> = {};
    if (unread === 'true') {
      filter.isRead = false;
    }

    const messages = await Message.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      throw createError('Message not found', 404);
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      throw createError('Message not found', 404);
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
