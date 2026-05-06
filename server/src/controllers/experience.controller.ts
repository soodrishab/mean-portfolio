import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models';
import { createError } from '../middleware/errorHandler';

export const getAllExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

export const getExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      throw createError('Experience not found', 404);
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      throw createError('Experience not found', 404);
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      throw createError('Experience not found', 404);
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
