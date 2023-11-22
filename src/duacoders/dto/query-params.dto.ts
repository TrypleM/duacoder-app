import { Type } from "class-transformer";
import { IsDate, IsDateString, IsIn, IsInt, IsOptional, IsPositive, IsString, IsUUID, Length, Matches, Min } from "class-validator";

export class QueryParamsDto {

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsIn(['id:ASC', 'id:DESC', 'nif:ASC', 'nif:DESC', 'name:ASC', 'name:DESC', 'position:ASC', 'position:DESC', 'department:ASC', 'department:DESC', 'tortillaOnion:ASC', 'tortillaOnion:DESC', 'date:ASC', 'date:DESC', 'id', 'nif', 'name', 'position', 'department', 'tortillaOnion', 'date'])
    orderby?: string;

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsString()
    @Length(9)
    @Matches(
        /[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]/,{
            message: 'incorrect NIF format (use capital letters)'
        }
    )
    nif?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsDateString()
    date?: string;
}