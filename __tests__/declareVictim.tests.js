import { victim } from '../mocks/mockData'
import London from '../models/london'

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

describe('Async add victim', () => {
    it('success', async () => {
        mockVictimAdd.mockReturnValue(victim)
        mockCheckVictim.mockReturnValue(true)
        const london = new London()
        const res = await london.addVictim(
            victim.name,
            victim.posX,
            victim.posY,
            victim.isVictim
        )
        expect(res).toBe(victim)
        expect(mockVictimAdd).toBeCalledTimes(1)
        expect(mockVictimAdd).toHaveBeenCalledWith(
            victim.name,
            victim.posX,
            victim.posY,
            victim.isVictim
        )
    })

    it('fail', async () => {
        mockVictimAdd.mockReturnValue(victim)
        mockCheckVictim.mockReturnValue(false)
        const london = new London()
        try {
            await london.addVictim(
                victim.name,
                victim.posX,
                victim.posY,
                victim.isVictim
            )
        } catch (error) {
            expect(error.message).toBe(
                'there is already a victim in the database'
            )
        }
    })
})
