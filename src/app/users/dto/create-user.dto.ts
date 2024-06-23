import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: MessageHelper.PASSWORD_VALIDATION })
  password: string;
}
