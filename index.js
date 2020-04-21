const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api-bcb')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) =>{
    const quotation = await apiBCB.getQuotation()    
    res.render('home', {
        quotation
    })
        
})

app.get('/quotation', (req, res) =>{
    const {quotation, amount} = req.query
    if(quotation && amount){
        const convertation = convert.convert(quotation, amount)
        res.render('quotation', {
            error: false,
            quotation: convert.toMoney(quotation),
            amount: convert.toMoney(amount),
            convertation: convert.toMoney(convertation)
        })
    }else{
        res.render('quotation', {
            error: 'Invalid value'
        })
    }
})

app.listen(port, error => {
    if(error){
        console.log('Unable to start')
    }else{
        console.log('Convert_my_Money is on')
    }
})
