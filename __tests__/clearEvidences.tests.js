import London from '../models/london'

const mockClearEvidences = jest.fn()
const mockCleanAll = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        clearEvidences: mockClearEvidences,
        cleanAll: mockCleanAll,
    }))
})
beforeEach(() => {
    jest.clearAllMocks()
})

describe('Async clear evidence', () => {
    it('success', async () => {
        mockCleanAll.mockReturnValue(true)
        const london = new London()
        const res = await london.clearEvidences()
        expect(res).toBeTruthy()
    })
})
