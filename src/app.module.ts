import { Module } from '@nestjs/common';
import { DbmMongoController } from './controllers/dbm-mongo/dbm-mongo.controller';
import { DbmMongoService } from './services/dbm-mongo/dbm-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DBSchema } from './models/dbm-model/dbm-model';
@Module({
  imports: [MongooseModule
    .forRoot('mongodb+srv://admin:D3SEx5kCudrOWDlR@dbmanager.hszctwp.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:'DBManager',schema: DBSchema}])
  ],
  controllers: [DbmMongoController],
  providers: [DbmMongoService],
})
export class AppModule {}
