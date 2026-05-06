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
      to: 'rishabsood91@gmail.com',
      subject: `Portfolio: ${subject || 'New Contact Message'}`,
      html: `
        <h2>New Portfolio Contact Message</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>From</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Subject</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subject || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Message</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">Received: ${new Date().toLocaleString()}</p>
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
