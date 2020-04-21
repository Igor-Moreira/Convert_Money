const axios = require('axios')

const getUrl = data =>`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getQuotationAPI = url => axios.get(url)
//axios.get(url).then( res => console.log(res.data.value[0].cotacaoVenda))
const extractQuotation = res => res.data.value[0].cotacaoVenda
const getToday = () =>{
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()}

const getQuotation = ({getToday, getUrl, extractQuotation, getQuotationAPI}) =>  async() => {
    try{            
        const today = getToday()
        const url = getUrl(today)
        const res = await getQuotationAPI(url)//04-10-2020
        const quotation = extractQuotation(res)
        return quotation
    }catch(error){
        return ''
    }
}


module.exports = {
    getQuotationAPI,
    getQuotation: getQuotation({getToday, getUrl, extractQuotation, getQuotationAPI}), 
    extractQuotation,
    getToday,
    getUrl,
    pure: {
        getQuotation
    }
}


