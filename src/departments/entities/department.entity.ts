import { ApiProperty } from '@nestjs/swagger';
import { Duacoder } from 'src/duacoders/entities/duacoder.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'departments'})
export class Department {

    @ApiProperty({
        example: 1,
        description: 'Department id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Management',
        description: 'Department name',
        uniqueItems: true
    })
    @Column('varchar', {
        unique: true,
        length: 25
    })
    name: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: 'Department description',
        uniqueItems: true
    })
    @Column('text')
    description: string;

    @OneToMany(
        () => Duacoder,
        (duacoder) => duacoder.department
    )
    duacoders?: Duacoder;
}
