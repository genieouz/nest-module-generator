import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { I<%= pascalCase(moduleName)%> } from '../schemas/interfaces/<%= moduleName %>.interface';
import { <%= camelCase(moduleName)%>ModelName } from '../schemas/<%= moduleName %>.model-name';

@Injectable()
export class <%= pascalCase(moduleName)%>Service extends AbstractService<I<%= pascalCase(moduleName)%>> {
  constructor(@InjectModel(<%= camelCase(moduleName)%>ModelName) model: Model<I<%= pascalCase(moduleName)%>>) {
    super(model);
  }
}

