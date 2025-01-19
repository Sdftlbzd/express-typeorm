import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";
import { EInquiryType } from "../../DAL/models/contact.model";

export class CreateContactDTO {
  @IsDefined({ message: "Name is required" })
  @IsString()
  @MaxLength(25, { message: "Name is too long" })
  @MinLength(3, { message: "En az 3 simvol olmalidir" })
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(25)
  surname: string;

  //   @ValidateIf((o) => o.email === "test@gmail.com")
  // @IsEmail({}, { message: "Email yalnız 'test@gmail.com' ola bilər." })
  // email: string;

  // @ValidateIf((o) => o.email === "test@gmail.com")
  // @IsDefined({ message: "Email yalnız 'test@gmail.com' ola bilər." })
  // email: string;

  @IsDefined()
  @ValidateIf((o) => o.email !== undefined) // Email daxil edilərsə yoxla
  @IsEmail({}, { message: "Email düzgün formatda olmalıdır." })
  @ValidateIf((o) => o.email === "test@gmail.com") // Yalnız test@gmail.com qəbul et
  email: string;

  // @IsEmail()
  // @ValidateIf((o) => o.email !== "test@gmail.com")
  // email: string;

  @IsDefined()
  @IsString()
  companyName: string;

  @IsEnum(EInquiryType)
  inquiryType: EInquiryType;

  @IsDefined()
  @IsString()
  message: string;
}

export class UpdateContactDTO {
  @IsOptional()
  @IsString()
  @MaxLength(25, { message: "Name is too long" })
  @MinLength(3, { message: "En az 3 simvol olmalidir" })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  surname: string;

  //   @ValidateIf((o) => o.email === "test@gmail.com")
  // @IsEmail({}, { message: "Email yalnız 'test@gmail.com' ola bilər." })
  // email: string;

  // @ValidateIf((o) => o.email === "test@gmail.com")
  // @IsDefined({ message: "Email yalnız 'test@gmail.com' ola bilər." })
  // email: string;

  @IsOptional()
  @ValidateIf((o) => o.email !== undefined) // Email daxil edilərsə yoxla
  @IsEmail({}, { message: "Email düzgün formatda olmalıdır." })
  @ValidateIf((o) => o.email === "test@gmail.com") // Yalnız test@gmail.com qəbul et
  email: string;

  // @IsEmail()
  // @ValidateIf((o) => o.email !== "test@gmail.com")
  // email: string;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsEnum(EInquiryType)
  inquiryType: EInquiryType;
}
