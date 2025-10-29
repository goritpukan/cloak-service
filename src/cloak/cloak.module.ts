import { Module } from '@nestjs/common';
import { CloakService } from './cloak.service';
import { CloakController } from './cloak.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schemas/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [CloakController],
  providers: [CloakService],
})
export class CloakModule {}
