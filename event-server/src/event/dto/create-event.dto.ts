import { Type } from "class-transformer";
import { IsDate, IsString, MaxLength, MinLength, IsBoolean, IsIn } from "class-validator";

export class CreateEventDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    @IsIn(['consecutive_login', 'invite', 'level', 'custom'], {
        message: 'event_type은 consecutive_login, invite, level, custom 중 하나여야 합니다.',
    })
    eventType: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    condition: string;

    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @IsBoolean()
    @Type(() => Boolean)
    isActive: boolean;
}
