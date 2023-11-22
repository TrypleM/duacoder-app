import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    
    @ApiProperty({
        example: "dd884e38-60b4-4de3-8022-b2cb31c093f1",
        description: "user id",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "jonhdoe@mail.com",
        description: "user mail",
        uniqueItems: true
    })
    @Column('varchar', {
        unique: true,
        length: 25
    })
    email: string;

    @ApiProperty({
        example: "Abcd1234.",
        description: "user password",
    })
    @Column('text', {
        select: false
    })
    password: string;

    @BeforeInsert()
    checkFieldsBefore() {
        this.email = this.email.toLowerCase().trim();
    }
}
