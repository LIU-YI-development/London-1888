import request from 'supertest'
import app from '../app'

const mockVictimAdd = jest.fn()
const mockCheckVictim = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        add: mockVictimAdd,
        checkVictim: mockCheckVictim,
    }))
})
beforeEach(() => {
    jest.clearAllMocks()
})

describe('Async declareVictim action', () => {
    it('-success', async () => {
        const fakeResponse = {
            id: 1,
            name: 'vick',
            posX: 5,
            posY: 8,
            isVictim: true,
        }
        mockCheckVictim.mockReturnValue(true)
        mockVictimAdd.mockReturnValue(fakeResponse)

        const response = await request(app).post('/victim/vick/5/8')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(fakeResponse)
        expect(mockVictimAdd).toHaveBeenCalledTimes(1)
        expect(mockVictimAdd).toHaveBeenCalledWith('vick', 5, 8, true)
    })

    it('a victim already exist  -fail', async () => {
        mockCheckVictim.mockReturnValue(false)

        const response = await request(app).post('/victim/vick/5/8')
        expect(response.status).toBe(409)
        expect(mockCheckVictim).toHaveBeenCalledTimes(1)
    })
})
