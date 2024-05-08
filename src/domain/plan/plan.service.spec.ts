import { HealthPlan } from "src/infra/schema/health.plan.schema";
import IRepository from "src/shared/interface/repository.interface";
import IPlan from "./plan.entity";
import PlanService from "./plan.service";

describe('PlanService', () => {

    // Should be able to create a new plan
    it('should create a new plan when valid data is provided', async () => {
      // Arrange
      const planData: IPlan = {
        name: 'Test Plan',
        description: 'Test Description',
        coverage: 'Test Coverage',
        price: 100,
        maxVisitsPerYear: 5,
        maxAge: 10,
        species: ['dog', 'cat'],
      };

      const mockRepository: IRepository<HealthPlan> = {
        create: jest.fn().mockResolvedValue(planData),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        findBy: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      };

      const planService = new PlanService(mockRepository);

      // Act
      const result = await planService.create(planData);

      // Assert
      expect(result).toEqual(planData);
      expect(mockRepository.create).toHaveBeenCalledWith(planData);
    });

    // Should throw an error if create method fails
    it('should throw an error if create method fails', async () => {
      // Arrange
      const planData: IPlan = {
        name: 'Test Plan',
        description: 'Test Description',
        coverage: 'Test Coverage',
        price: 100,
        maxVisitsPerYear: 5,
        maxAge: 10,
        species: ['dog', 'cat'],
      };

      const mockRepository: IRepository<HealthPlan> = {
        create: jest.fn().mockRejectedValue(new Error('Create failed')),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        findBy: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      };

      const planService = new PlanService(mockRepository);

      // Act and Assert
      await expect(planService.create(planData)).rejects.toThrowError('Create failed');
      expect(mockRepository.create).toHaveBeenCalledWith(planData);
    });
});
