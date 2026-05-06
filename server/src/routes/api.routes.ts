import { Router } from 'express';
import { contactLimiter, chatLimiter } from '../middleware';
import {
  getProfile,
  updateProfile,
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getAllSkills,
  getSkillByCategory,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  getTechnologies,
  submitContactForm,
  getAllMessages,
  markAsRead,
  deleteMessage,
  chat,
  getSuggestedQuestions
} from '../controllers';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Experience routes
router.get('/experiences', getAllExperiences);
router.get('/experiences/:id', getExperienceById);
router.post('/experiences', createExperience);
router.put('/experiences/:id', updateExperience);
router.delete('/experiences/:id', deleteExperience);

// Skills routes
router.get('/skills', getAllSkills);
router.get('/skills/:category', getSkillByCategory);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Project routes
router.get('/projects', getAllProjects);
router.get('/projects/technologies', getTechnologies);
router.get('/projects/:slug', getProjectBySlug);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Contact routes
router.post('/contact', contactLimiter, submitContactForm);
router.get('/messages', getAllMessages);
router.put('/messages/:id/read', markAsRead);
router.delete('/messages/:id', deleteMessage);

// Chat routes
router.post('/chat', chatLimiter, chat);
router.get('/chat/suggestions', getSuggestedQuestions);

export default router;
