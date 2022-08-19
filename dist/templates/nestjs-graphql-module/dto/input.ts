import { Field, InputType } from "type-graphql";

@InputType()
export class <%= pascalCase(moduleName)%>Input {
    @Field()
    id: string;
}
