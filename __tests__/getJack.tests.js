import {
    firstClosestCitizen,
    normalCitizen,
    secondClosestCitizen,
    victim,
} from '../mocks/mockData'
import London from '../models/london'

const mockGetJack = jest.fn()
const mockGetData = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        getJack: mockGetJack,
        getData: mockGetData,
    }))
})

describe('Async get jack', () => {
    it('success', async () => {
        mockGetData.mockReturnValue([
            victim,
            firstClosestCitizen,
            normalCitizen,
        ])

        const london = new London()
        const res = await london.getJack()

        expect(res).toBeTruthy()
        expect(res).toEqual(firstClosestCitizen)
        expect(mockGetData).toBeCalledTimes(1)
    })

    it('no victim -fail', async () => {
        mockGetData.mockReturnValue([
            firstClosestCitizen,
            secondClosestCitizen,
            normalCitizen,
        ])

        const london = new London()
        try {
            await london.getJack()
        } catch (error) {
            expect(error.message).toBe('there is no victim or citizen')
        }
    })

    it('no citizens -fail', async () => {
        mockGetData.mockReturnValue([victim])

        const london = new London()
        try {
            await london.getJack()
        } catch (error) {
            expect(error.message).toBe('there is no victim or citizen')
        }
    })

    it('no citizens and no victim  -fail', async () => {
        mockGetData.mockReturnValue([])

        const london = new London()
        try {
            await london.getJack()
        } catch (error) {
            expect(error.message).toBe('there is no victim or citizen')
        }
    })

    it('conflict with citizens distance  -fail', async () => {
        mockGetData.mockReturnValue([
            victim,
            firstClosestCitizen,
            secondClosestCitizen,
        ])
        const london = new London()
        try {
            await london.getJack()
        } catch (error) {
            expect(error.message).toBe(
                'there are at least two citizens at the same distance from the victim'
            )
        }
    })
})
