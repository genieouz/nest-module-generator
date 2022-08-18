import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from 'type-graphql';
import { <%= pascalCase(moduleName)%> } from '../dto/<%= moduleName %>.entity';
import { <%= pascalCase(moduleName)%>Input } from '../dto/<%= moduleName %>.input';
import { <%= pascalCase(moduleName)%>UpdateInput } from '../dto/<%= moduleName %>.update.input';
import { I<%= pascalCase(moduleName)%> } from '../schemas/interfaces/<%= moduleName %>.interface';
import { <%= pascalCase(moduleName)%>Service } from '../services/<%= moduleName %>.service';

@Resolver()
export class <%= pascalCase(moduleName)%>Resolver {
  constructor(private <%= camelCase(moduleName)%>Service: <%= pascalCase(moduleName)%>Service) {}

  @Mutation(returns => <%= pascalCase(moduleName)%>)
  create<%= pascalCase(moduleName)%>(
    @Args({ name: '<%= camelCase(moduleName)%>Input', type: () => <%= pascalCase(moduleName)%>Input })
    <%= camelCase(moduleName)%>Input: I<%= pascalCase(moduleName)%>,
  ): Promise<I<%= pascalCase(moduleName)%>> {
    return this.<%= camelCase(moduleName)%>Service.insertOne(<%= camelCase(moduleName)%>Input);
  }

  @Mutation(returns => Boolean)
  update<%= pascalCase(moduleName)%>(
    @Args({ name: '<%= camelCase(moduleName)%>Input', type: () => <%= pascalCase(moduleName)%>UpdateInput })
    <%= camelCase(moduleName)%>Input: I<%= pascalCase(moduleName)%>,
    @Args({ name: '<%= camelCase(moduleName)%>Id', type: () => ID }) <%= camelCase(moduleName)%>Id: string,
  ): Promise<boolean> {
    return this.<%= camelCase(moduleName)%>Service.updateOneById(<%= camelCase(moduleName)%>Id, <%= camelCase(moduleName)%>Input);
  }

  @Query(returns => [<%= pascalCase(moduleName)%>])
  fetch<%= pascalCase(moduleName)%>s(): Promise<I<%= pascalCase(moduleName)%>[]> {
    return this.<%= camelCase(moduleName)%>Service.findMany({});
  }

  @Query(returns => <%= pascalCase(moduleName)%>)
  fetch<%= pascalCase(moduleName)%>(
    @Args({ name: '<%= camelCase(moduleName)%>Id', type: () => ID }) <%= camelCase(moduleName)%>Id: string,
  ): Promise<I<%= pascalCase(moduleName)%>> {
    return this.<%= camelCase(moduleName)%>Service.findOneByIdOrFail(<%= camelCase(moduleName)%>Id);
  }
}
