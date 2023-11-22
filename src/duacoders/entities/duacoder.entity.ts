import { ApiProperty } from "@nestjs/swagger";
import { Department } from "src/departments/entities/department.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'duacoders'})
export class Duacoder {

    @ApiProperty({
        example: "dd884e38-60b4-4de3-8022-b2cb31c093f1",
        description: "duacoder id",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "11111111A",
        description: "duacoder nif",
        uniqueItems: true
    })
    @Column('varchar', {
        length: 9,
        unique: true
    })
    nif: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: 'Duacoder bio',
        default: null
    })
    @Column('text', {
        nullable: true
    })
    bio: string;

    @ApiProperty({
        example: 'Jonh Doe',
        description: 'Duacoder name'
    })
    @Column('text')
    name: string;
    
    @ApiProperty({
        example: 'Developer',
        description: 'Duacoder position'
    })
    @Column('text',{
        nullable: true
    })
    position: string;
    
    @ApiProperty({
        example: ['good'],
        description: 'Duacoder skills'
    })
    @Column('simple-array')
    skills: string[];
    
    @ApiProperty({
        example: 'http://localhost:3000/files/images/e1c2e6fc-ba90-4cbe-8274-d92a963ba188.png',
        description: 'Duacoder image'
    })
    @Column('text', {
        nullable: true
    })
    img: string;

    @ApiProperty({
        example: true,
        description: 'Tortilla with onion'
    })
    @Column('boolean', {
        default: false
    })
    tortillaOnion: boolean;
    
    @ApiProperty({
        example: '2000-01-01',
        description: 'Duacoder birthday'
    })
    @Column('date', {
        nullable: true
    })
    date: string;

    @ApiProperty()
    @ManyToOne(
        () => Department,
        (departments) => departments.duacoders,
        {
            eager: true,
            onDelete: 'SET NULL'
        }
    )
    department?: Department;
}
