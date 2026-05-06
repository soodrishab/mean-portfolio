import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models';
import { createError } from '../middleware/errorHandler';

export const getAllSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ order: 1 });

    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

export const getSkillByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findOne({
      category: { $regex: new RegExp(req.params.category, 'i') }
    });

    if (!skill) {
      throw createError('Skill category not found', 404);
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      throw createError('Skill not found', 404);
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      throw createError('Skill not found', 404);
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
