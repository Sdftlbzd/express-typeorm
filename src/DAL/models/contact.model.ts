import { IsEmail, Length } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum EInquiryType {
  PARTNERSHIP = "PARTNERSHIP",
  INVESTMENT = "INVESTMENT",
  GENERAL = "GENERAL",
}

@Entity({ name: "contacts" })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  @Length(3, 150, { message: "Name must be between 3 and 50 characters." })
  name: string;

  @Column({ type: "varchar", length: 150 })
  @Length(3, 150, { message: "Name must be between 3 and 50 characters." })
  surname: string;

  @Column({ type: "varchar", length: 150 })
  @IsEmail({}, { message: "Email must be a valid email address." })
  email: string;

  @Column({ type: "varchar", length: 150 })
  companyName: string;

  @Column({
    type: "enum",
    enum: EInquiryType,
    default: EInquiryType.GENERAL,
  })
  inquiryType: EInquiryType;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;

  @DeleteDateColumn({ type: "datetime" })
  deleted_at: Date;
}
