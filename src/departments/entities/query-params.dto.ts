import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";

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
    @IsIn(['id:ASC', 'id:DESC', 'name:ASC', 'name:DESC', 'id', 'name'])
    orderby?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;
}