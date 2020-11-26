import { normalCitizen } from '../mocks/mockData'
import London from '../models/london'

const mockCitizenAdd = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        add: mockCitizenAdd,
    }))
})
beforeEach(() => {
    jest.clearAllMocks()
})

describe('Async add citizen', () => {
    it('success', async () => {
        mockCitizenAdd.mockReturnValue(normalCitizen)
        const london = new London()
        const res = await london.addCitizen(
            normalCitizen.name,
            normalCitizen.posX,
            normalCitizen.posY,
            normalCitizen.isVictim
        )
        expect(res).toBe(normalCitizen)
        expect(mockCitizenAdd).toBeCalledTimes(1)
        expect(mockCitizenAdd).toHaveBeenCalledWith(
            normalCitizen.name,
            normalCitizen.posX,
            normalCitizen.posY,
            normalCitizen.isVictim
        )
    })

    it('fail', async () => {
        mockCitizenAdd.mockReturnValue(null)
        const london = new London()
        const res = await london.addCitizen(
            normalCitizen.name,
            normalCitizen.posX,
            normalCitizen.isVictim
        )
        expect(mockCitizenAdd).toBeCalledTimes(1)
        expect(mockCitizenAdd).toHaveBeenCalledWith(
            normalCitizen.name,
            normalCitizen.posX,
            false,
            normalCitizen.isVictim
        )
        expect(res).toBe(null)
    })
})
