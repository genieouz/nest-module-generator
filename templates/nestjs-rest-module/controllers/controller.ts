import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { I<%= pascalCase(moduleName)%> } from '../schemas/interfaces/<%= moduleName %>.interface';
import { <%= pascalCase(moduleName)%>Service } from '../services/<%= moduleName %>.service';

@Controller('<%= moduleName %>')
export class <%= pascalCase(moduleName)%>Controller {
  constructor(private <%= camelCase(moduleName)%>Service: <%= pascalCase(moduleName)%>Service) {}

  @Post()
  create<%= pascalCase(moduleName)%>(
    @Body() <%= camelCase(moduleName)%>Input: I<%= pascalCase(moduleName)%>,
  ): Promise<I<%= pascalCase(moduleName)%>> {
    return this.<%= camelCase(moduleName)%>Service.insertOne(<%= camelCase(moduleName)%>Input);
  }

  @Put(':id')
  update<%= pascalCase(moduleName)%>(
    @Body() <%= camelCase(moduleName)%>Input: I<%= pascalCase(moduleName)%>,
    @Param('id') <%= camelCase(moduleName)%>Id: string,
  ): Promise<boolean> {
    return this.<%= camelCase(moduleName)%>Service.updateOneById(<%= camelCase(moduleName)%>Id, <%= camelCase(moduleName)%>Input);
  }

  @Get()
  fetch<%= pascalCase(moduleName)%>s(): Promise<I<%= pascalCase(moduleName)%>[]> {
    return this.<%= camelCase(moduleName)%>Service.findMany({});
  }

  @Get(':id')
  fetch<%= pascalCase(moduleName)%>(
    @Param('id') <%= camelCase(moduleName)%>Id: string,
  ): Promise<I<%= pascalCase(moduleName)%>> {
    return this.<%= camelCase(moduleName)%>Service.findOneByIdOrFail(<%= camelCase(moduleName)%>Id);
  }
}
