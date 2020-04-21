const api = require('./api-bcb')
//import axios
const axios = require('axios')

//axios copy
jest.mock('axios')

test('getQuotationAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.1}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getQuotationAPI('url').then(resp => {
        expect(resp).toEqual(res)
        //console.log(axios.get.mock)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})
test('extractQuotation', () => {
    const quotation = api.extractQuotation({
        data: {
            value: [
                { cotacaoVenda: 5.1}
            ]
        }
    })
    expect(quotation).toBe(5.1)
})
//fixing date 
describe('getToday', () => {
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.Date = RealDate
    })
    test('getToday', () => {
        mockDate('2020-04-04T12:00:00z')
        const today = api.getToday()
 
        expect(today).toBe('4-4-2020') 
    })   
})

test('getUrl', () => {
    // sobrepoem o url
    const url = api.getUrl('Minha-Data')
    //espero q o url seja ...
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27Minha-Data%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
}) 

test('getQuotation', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.1}
            ]
        }
    }

    const getToday = jest.fn()
    getToday.mockResolvedValue('04-04-2020')

    const getUrl = jest.fn()
    getUrl.mockResolvedValue('url')

    const getQuotationAPI = jest.fn()
    getQuotationAPI.mockResolvedValue(res)

    const extractQuotation = jest.fn()
    extractQuotation.mockResolvedValue(5.1)

    api.pure.getQuotation({getToday, getUrl, extractQuotation, getQuotationAPI})().then(res => {
        expect(res).toBe(5.1)        
        })

})

test('getQuotation', () => {
    const res = {
    }

    const getToday = jest.fn()
    getToday.mockResolvedValue('04-04-2020')

    const getUrl = jest.fn()
    getUrl.mockResolvedValue('url')

    const getQuotationAPI = jest.fn()
    getQuotationAPI.mockReturnValue(Promise.reject('err'))

    const extractQuotation = jest.fn()
    extractQuotation.mockResolvedValue(5.1)

    api.pure.getQuotation({getToday, getUrl, extractQuotation, getQuotationAPI})().then(res => {
        expect(res).toBe('')
        })

})