import {
  IsDefined,
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsDefined({ message: "Name is required" })
  @IsString()
  @MaxLength(25, { message: "Name is too long" })
  @MinLength(3, { message: "En az 3 simvol olmalidir" })
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(50)
  surname: string;

  @IsDefined()
  @IsInt({ message: "Age must be an integer." })
  @IsPositive({ message: "Age must be a positive number." })
  @Min(18, { message: "Age must be at least 18." })
  age: Number;

  @IsDefined()
  @IsEmail({}, { message: "Email düzgün formatda olmalıdır." })
  email: string;
}
