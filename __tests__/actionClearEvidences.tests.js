import request from 'supertest'
import app from '../app'

const mockClearEvidences = jest.fn()
const mockCleanAll = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        clearEvidences: mockClearEvidences,
        cleanAll: mockCleanAll,
    }))
})

describe('Evidences action', () => {
    it('turncate table', async () => {
        mockCleanAll.mockReturnValue(true)
        const res = await request(app).delete('/evidences')
        expect(res.status).toBe(204)
        expect(mockCleanAll).toHaveBeenCalledTimes(1)
    })
})
