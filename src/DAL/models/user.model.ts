import { IsEmail, IsInt, IsPositive, Length, Max, Min } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  @Length(3, 150, { message: "Name must be between 3 and 50 characters." })
  name: string;

  @Column({ type: "varchar", length: 150 })
  @Length(3, 150, { message: "Name must be between 3 and 50 characters." })
  surname: string;

  @Column({ type: "int" })
  @IsInt({ message: "Age must be an integer." })
  @IsPositive({ message: "Age must be a positive number." })
  @Min(18, { message: "Age must be at least 18." })
  age: number;

  @Column({ type: "varchar", length: 150 })
  @IsEmail({}, { message: "Email must be a valid email address." })
  email: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;

  @DeleteDateColumn({ type: "datetime" })
  deleted_at: Date;
}
