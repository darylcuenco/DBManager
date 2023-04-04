import { Test, TestingModule } from '@nestjs/testing';
import { DbmMongoService } from './dbm-mongo.service';

describe('DbmMongoService', () => {
  let service: DbmMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbmMongoService],
    }).compile();

    service = module.get<DbmMongoService>(DbmMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
