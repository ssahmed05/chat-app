import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {
    
    @IsString()
    @IsNotEmpty()
    readonly sender: string
    
    @IsString()
    @IsNotEmpty()
    readonly text: string
    

}
