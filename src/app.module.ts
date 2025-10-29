import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloakModule } from './cloak/cloak.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cloak-service'),
    CloakModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
