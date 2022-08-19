import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class <%= pascalCase(moduleName)%> {
    @Field(type => ID)
    id: string;
}
