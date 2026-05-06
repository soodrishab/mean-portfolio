import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Profile, Experience, Skill, Project, Message, ChatKnowledge } from '../models';
import * as profileController from '../controllers/profile.controller';
import * as experienceController from '../controllers/experience.controller';
import * as skillController from '../controllers/skill.controller';
import * as projectController from '../controllers/project.controller';
import * as contactController from '../controllers/contact.controller';
import * as chatController from '../controllers/chat.controller';

let mongoServer: MongoMemoryServer;

// Mock request/response helpers
const mockRequest = (body = {}, params = {}, query = {}): Partial<Request> => ({
  body,
  params,
  query,
  ip: '127.0.0.1',
  get: jest.fn().mockReturnValue('test-user-agent')
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Profile.deleteMany({});
  await Experience.deleteMany({});
  await Skill.deleteMany({});
  await Project.deleteMany({});
  await Message.deleteMany({});
  await ChatKnowledge.deleteMany({});
  jest.clearAllMocks();
});

describe('Profile Controller', () => {
  const testProfile = {
    name: 'Test User',
    title: 'Developer',
    tagline: 'Test tagline',
    summary: 'Test summary',
    email: 'test@test.com',
    phone: '+1234567890',
    location: 'Test City',
    isActive: true
  };

  test('getProfile should return profile when exists', async () => {
    await Profile.create(testProfile);
    const req = mockRequest();
    const res = mockResponse();

    await profileController.getProfile(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({ name: 'Test User' })
      })
    );
  });

  test('getProfile should call next with error when profile not found', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await profileController.getProfile(req as Request, res as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });

  test('updateProfile should update and return profile', async () => {
    await Profile.create(testProfile);
    const req = mockRequest({ name: 'Updated Name' });
    const res = mockResponse();

    await profileController.updateProfile(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({ name: 'Updated Name' })
      })
    );
  });
});

describe('Experience Controller', () => {
  const testExperience = {
    company: 'Test Company',
    position: 'Developer',
    location: 'Test City',
    startDate: new Date('2020-01-01'),
    technologies: ['JavaScript', 'Node.js']
  };

  test('getAllExperiences should return all experiences', async () => {
    await Experience.create(testExperience);
    const req = mockRequest();
    const res = mockResponse();

    await experienceController.getAllExperiences(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 1,
        data: expect.arrayContaining([
          expect.objectContaining({ company: 'Test Company' })
        ])
      })
    );
  });

  test('createExperience should create new experience', async () => {
    const req = mockRequest(testExperience);
    const res = mockResponse();

    await experienceController.createExperience(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({ company: 'Test Company' })
      })
    );
  });

  test('getExperienceById should return experience when exists', async () => {
    const exp = await Experience.create(testExperience);
    const req = mockRequest({}, { id: exp._id.toString() });
    const res = mockResponse();

    await experienceController.getExperienceById(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({ company: 'Test Company' })
      })
    );
  });

  test('deleteExperience should delete experience', async () => {
    const exp = await Experience.create(testExperience);
    const req = mockRequest({}, { id: exp._id.toString() });
    const res = mockResponse();

    await experienceController.deleteExperience(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Experience deleted successfully'
      })
    );
  });
});

describe('Skill Controller', () => {
  const testSkill = {
    category: 'Frontend',
    items: [{ name: 'Angular', proficiency: 90 }]
  };

  test('getAllSkills should return all skills', async () => {
    await Skill.create(testSkill);
    const req = mockRequest();
    const res = mockResponse();

    await skillController.getAllSkills(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 1
      })
    );
  });

  test('createSkill should create new skill', async () => {
    const req = mockRequest(testSkill);
    const res = mockResponse();

    await skillController.createSkill(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe('Project Controller', () => {
  const testProject = {
    title: 'Test Project',
    slug: 'test-project',
    description: 'Test description',
    technologies: ['Angular', 'Node.js'],
    isLive: true
  };

  test('getAllProjects should return all projects', async () => {
    await Project.create(testProject);
    const req = mockRequest({}, {}, {});
    const res = mockResponse();

    await projectController.getAllProjects(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 1
      })
    );
  });

  test('getAllProjects should filter by technology', async () => {
    await Project.create(testProject);
    const req = mockRequest({}, {}, { technology: 'Angular' });
    const res = mockResponse();

    await projectController.getAllProjects(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 1
      })
    );
  });

  test('getProjectBySlug should return project', async () => {
    await Project.create(testProject);
    const req = mockRequest({}, { slug: 'test-project' });
    const res = mockResponse();

    await projectController.getProjectBySlug(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({ title: 'Test Project' })
      })
    );
  });

  test('getTechnologies should return unique technologies', async () => {
    await Project.create(testProject);
    const req = mockRequest();
    const res = mockResponse();

    await projectController.getTechnologies(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining(['Angular', 'Node.js'])
      })
    );
  });
});

describe('Contact Controller', () => {
  test('submitContactForm should create message', async () => {
    const req = mockRequest({
      name: 'Test User',
      email: 'test@test.com',
      message: 'Test message'
    });
    const res = mockResponse();

    await contactController.submitContactForm(req as Request, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining('Thank you')
      })
    );
  });

  test('submitContactForm should reject invalid email', async () => {
    const req = mockRequest({
      name: 'Test User',
      email: 'invalid-email',
      message: 'Test message'
    });
    const res = mockResponse();

    await contactController.submitContactForm(req as Request, res as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });

  test('submitContactForm should reject missing fields', async () => {
    const req = mockRequest({ name: 'Test User' });
    const res = mockResponse();

    await contactController.submitContactForm(req as Request, res as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('Chat Controller', () => {
  beforeEach(async () => {
    await ChatKnowledge.create({
      keywords: ['hello', 'hi'],
      question: 'Hello',
      answer: 'Hello! How can I help you?',
      category: 'greeting',
      priority: 10
    });

    await Profile.create({
      name: 'Test User',
      title: 'Developer',
      tagline: 'Test',
      summary: 'Test',
      email: 'test@test.com',
      phone: '+1234567890',
      location: 'Test City',
      isActive: true
    });
  });

  test('chat should return greeting response', async () => {
    const req = mockRequest({ message: 'Hello!' });
    const res = mockResponse();

    await chatController.chat(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          message: expect.any(String)
        })
      })
    );
  });

  test('chat should reject empty message', async () => {
    const req = mockRequest({ message: '' });
    const res = mockResponse();

    await chatController.chat(req as Request, res as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });

  test('getSuggestedQuestions should return suggestions', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await chatController.getSuggestedQuestions(req as Request, res as Response, mockNext);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.any(Array)
      })
    );
  });
});
