import request from 'supertest'
import app from '../app'

const mockCitizenAdd = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        add: mockCitizenAdd,
    }))
})
beforeEach(() => {
    jest.clearAllMocks()
})

describe('Async declareNormalCitizen action', () => {
    it('-success', async () => {
        const fakeCitizenResponse = {
            id: 1,
            name: 'litao',
            posX: 5,
            posY: 5,
            isVictim: false,
        }

        mockCitizenAdd.mockReturnValue(fakeCitizenResponse)

        const response = await request(app).post('/citizen/litao/5/5')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(fakeCitizenResponse)
        expect(mockCitizenAdd).toHaveBeenCalledTimes(1)
        expect(mockCitizenAdd).toHaveBeenCalledWith('litao', 5, 5, false)
    })
})
