import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";

export class CreateDuacoderDto {

    @ApiProperty({
        description: 'Duacoder nif',
        nullable: false,
        minLength: 9,
        example: '11111111A'
    })
    @IsString()
    @Length(9)
    @Matches(
        /[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]/,{
            message: 'incorrect NIF format (use capital letters)'
        }
    )
    nif: string;

    @ApiProperty({
        description: 'Duacoder name',
        nullable: false,
        minLength: 1,
        example: 'Jonh Doe'
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Duacoder bio',
        nullable: true,
        minLength: 1,
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    bio?: string;

    @ApiProperty({
        description: 'Department id',
        nullable: true,
        example: 1
    })
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    department?: number;

    @ApiProperty({
        description: 'Duacoder position',
        nullable: true,
        minLength: 1,
        example: 'Developer'
    })
    @IsString()
    @IsOptional()
    position?: string;

    @ApiProperty({
        description: 'Duacoder skills',
        example: ['good']
    })
    @IsString({each: true})
    @IsArray()
    skills: string[];

    @ApiProperty({
        description: 'Duacoder image',
        nullable: true,
        example: 'http://localhost:3000/files/images/e1c2e6fc-ba90-4cbe-8274-d92a963ba188.png'
    })
    @IsString()
    @IsOptional()
    img?: string;

    @ApiProperty({
        example: true,
        description: 'Tortilla with onion',
        nullable: false
    })
    @IsBoolean()
    tortillaOnion: boolean;

    @ApiProperty({
        example: '2000-01-01',
        description: 'Duacoder birthday',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    date?: string;
}
