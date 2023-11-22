import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    MYSQL_DATABASE: Joi.required() ,
    MYSQL_USER: Joi.required(),
    MYSQL_PASSWORD: Joi.required(),
    MYSQL_ROOT_PASSWORD: Joi.required(),
    MYSQL_DB_PORT: Joi.number().default(3306),
    PORT: Joi.number().default(3000),
    HOST: Joi.string().default('localhost'),
    JWT_SECRET: Joi.string().required(),
    HOST_API: Joi.string()
});