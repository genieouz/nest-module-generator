import { Field, InputType } from "type-graphql";

@InputType()
export class <%= pascalCase(moduleName)%>UpdateInput {
    @Field()
    id: string;
}
