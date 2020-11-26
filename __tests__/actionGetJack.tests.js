import request from 'supertest'
import app from '../app'
import {
    firstClosestCitizen,
    normalCitizen,
    secondClosestCitizen,
    victim,
} from '../mocks/mockData'

const mockGetJack = jest.fn()
const mockGetData = jest.fn()

jest.mock('../orm/repositories/citizenRepo', () => {
    return jest.fn().mockImplementation(() => ({
        getJack: mockGetJack,
        getData: mockGetData,
    }))
})
beforeEach(() => {
    jest.clearAllMocks()
})

describe('Async Get Jack action', () => {
    it('no victim  -fail', async () => {
        mockGetData.mockReturnValue([
            firstClosestCitizen,
            secondClosestCitizen,
            normalCitizen,
        ])

        const res = await request(app).get('/getJack')

        expect(res.status).toBe(404)
        expect(mockGetData).toBeCalledTimes(1)
    })

    it('no citizens  -fail', async () => {
        mockGetData.mockReturnValue([victim])

        const res = await request(app).get('/getJack')

        expect(res.status).toBe(404)
        expect(mockGetData).toBeCalledTimes(1)
    })

    it('no citizens and no victim  -fail', async () => {
        mockGetData.mockReturnValue([])

        const res = await request(app).get('/getJack')

        expect(res.status).toBe(404)
        expect(mockGetData).toBeCalledTimes(1)
    })

    it('conflict with citizens distance  -fail', async () => {
        mockGetData.mockReturnValue([
            victim,
            firstClosestCitizen,
            secondClosestCitizen,
        ])

        const res = await request(app).get('/getJack')

        expect(res.status).toBe(409)
        expect(mockGetData).toBeCalledTimes(1)
    })

    it('find closest citizen -success', async () => {
        mockGetData.mockReturnValue([
            victim,
            firstClosestCitizen,
            normalCitizen,
        ])

        const res = await request(app).get('/getJack')

        expect(res.status).toBe(200)
        expect(res.body).toEqual(firstClosestCitizen)
        expect(mockGetData).toBeCalledTimes(1)
    })
})
