import { Test, TestingModule } from '@nestjs/testing';
import { DbmMongoController } from './dbm-mongo.controller';

describe('DbmMongoController', () => {
  let controller: DbmMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbmMongoController],
    }).compile();

    controller = module.get<DbmMongoController>(DbmMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
