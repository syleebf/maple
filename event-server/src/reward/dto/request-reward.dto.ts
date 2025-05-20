import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export class RequestRewardDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    eventId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    userId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    reward: string;

    @IsBoolean()
    complated: boolean;
}
