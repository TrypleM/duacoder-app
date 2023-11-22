export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    database: process.env.MYSQL_DATABASE || 'duacodersDb',
    userDB: process.env.MYSQL_USER || 'duacoder',
    dbPassword: process.env.MYSQL_PASSWORD || 'P4SSw0rD123', 
    dbPort: +process.env.MYSQL_DB_PORT || 3306,
    rootPassword: process.env.MYSQL_ROOT_PASSWORD || 'P4SSw0rD123',
    port: +process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    jwtSecret: process.env.JWT_SECRET || '3sT33sM1s33dS3cR3t0',
    hostApi: process.env.HOST_API || 'http://localhost:3000'
})