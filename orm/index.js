import { createConnection } from 'typeorm'
import { NormalCitizenSchema } from './entities/citizens'
import constants from '../constants'
class Orm {
    async connect() {
        try {
            return await createConnection({
                type: constants.DATABASE_TYPE,
                host: constants.DATABASE_HOST_IP_ADDRESS,
                port: constants.DATABASE_PORT,
                username: constants.DATABASE_USERNAME,
                password: constants.DATABASE_PASSWORD,
                database: constants.DATABASE_NAME,
                entities: [NormalCitizenSchema],
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

const orm = new Orm()

export const getOrm = () => orm
