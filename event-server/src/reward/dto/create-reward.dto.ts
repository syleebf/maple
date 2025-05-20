import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateRewardDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    eventId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    reward: string;

}
