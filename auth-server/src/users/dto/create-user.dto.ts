import { IsString, MinLength, MaxLength, Matches, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/, {
    message: '비밀번호는 최소 6자, 문자와 숫자를 포함해야 합니다.',
  })
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(['user', 'operator', 'auditor', 'admin'], {
    message: 'role은 user, operator, auditor, admin 중 하나여야 합니다.',
  })
  role: string;
}
