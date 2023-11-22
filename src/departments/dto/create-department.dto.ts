import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";
export class CreateDepartmentDto {

    @ApiProperty({
        example: 'Management',
        description: 'Department name',
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: 'Department description',
        minLength: 1,
        nullable: true
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    description?: string;
}
