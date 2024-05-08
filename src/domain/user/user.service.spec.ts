import IRepository from "src/shared/interface/repository.interface";
import UserService from "./user.service";
import IUser from "./user.entity";
import { User } from "src/infra/schema/user.schema";

describe('UserService', () => {

    it('should generate a password with the correct length and format', () => {
      // Arrange
      const mockUserRepository: IRepository<User> = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        findBy: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
      };

      const userService = new UserService(mockUserRepository);

      const password = userService.generateRandomPassword();
    
      expect(password).toMatch(/^[a-zA-Z0-9]{10}$/);
    });
});
