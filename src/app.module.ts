import { Module } from '@nestjs/common';
import { DbmMongoController } from './controllers/dbm-mongo/dbm-mongo.controller';
import { DbmMongoService } from './services/dbm-mongo/dbm-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DBSchema } from './models/dbm-model/dbm-model';
import { Config } from './config/config';

const config : Config = new Config();
@Module({
  imports: [MongooseModule
    .forRoot(config.connStr),
    MongooseModule.forFeature([{name:'DBManager',schema: DBSchema}])
  ],
  controllers: [DbmMongoController],
  providers: [DbmMongoService],
})
export class AppModule {}
