import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= pascalCase(moduleName)%>Resolver } from './resolvers/<%= moduleName %>.resolver';
import {
    <%= camelCase(moduleName)%>ModelName,
} from './schemas/<%= moduleName %>.model-name';
import { <%= camelCase(moduleName)%>Schema } from './schemas/<%= moduleName %>.schema';
import { <%= pascalCase(moduleName)%>Service } from './services/<%= moduleName %>.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: <%= camelCase(moduleName)%>Schema, name: <%= camelCase(moduleName)%>ModelName },
    ]),
  ],
  providers: [
    <%= pascalCase(moduleName)%>Service,
    <%= pascalCase(moduleName)%>Resolver,
  ],
})
export class <%= pascalCase(moduleName)%>Module {}
