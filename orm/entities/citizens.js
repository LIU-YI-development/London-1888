import { EntitySchema } from 'typeorm'
import Citizen from '../../models/citizen'

export const NormalCitizenSchema = new EntitySchema({
    tableName: 'LondonCitizen',
    name: 'citizen',
    target: Citizen,
    columns: {
        id: {
            primary: true,
            generated: true,
            type: 'int',
        },
        name: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        posX: {
            type: 'int',
            nullable: false,
        },
        posY: {
            type: 'int',
            nullable: false,
        },
        isVictim: {
            type: 'boolean',
        },
    },
})
