import { getOrm } from '..'
import Citizen from '../../models/citizen'

class CitizenRepo {
    async add(name, posX, posY, isVictim) {
        const connection = await getOrm().connect()
        try {
            const dataRepository = connection.getRepository(Citizen)
            let citizen = new Citizen(null, name, posX, posY, isVictim)
            return await dataRepository.save(citizen)
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async checkVictim() {
        const connection = await getOrm().connect()

        try {
            const dataRepository = connection.getRepository(Citizen)
            const obj = await dataRepository.count({ isVictim: true })
            if (obj !== 0) return false
            return true
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }


    async getData() {
        const connection = await getOrm().connect()

        try {
            const dataRepository = connection.getRepository(Citizen)
            return await dataRepository.find()
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async cleanAll() {
        const connection = await getOrm().connect()
        try {
            const dataRepository = connection.getRepository(Citizen)
            return await dataRepository.query(`truncate LondonCitizen;`)
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }
}
export default CitizenRepo
