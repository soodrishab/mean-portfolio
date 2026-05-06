import { Request, Response, NextFunction } from 'express';
import { Project } from '../models';
import { createError } from '../middleware/errorHandler';

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { technology, category, featured } = req.query;

    const filter: Record<string, unknown> = { isLive: true };

    if (technology) {
      filter.technologies = { $in: [technology] };
    }

    if (category) {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      throw createError('Project not found', 404);
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Generate slug from title if not provided
    if (!req.body.slug) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      throw createError('Project not found', 404);
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      throw createError('Project not found', 404);
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find({ isLive: true });
    const technologies = [...new Set(projects.flatMap(p => p.technologies))];

    res.json({
      success: true,
      data: technologies.sort()
    });
  } catch (error) {
    next(error);
  }
};
