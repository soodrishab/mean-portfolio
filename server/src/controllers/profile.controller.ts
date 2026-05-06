import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models';
import { createError } from '../middleware/errorHandler';

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profile = await Profile.findOne({ isActive: true });

    if (!profile) {
      throw createError('Profile not found', 404);
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      throw createError('Profile not found', 404);
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};
