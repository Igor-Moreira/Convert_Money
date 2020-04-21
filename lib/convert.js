const convert = (quotation, amount) =>{
    return quotation * amount
}
const toMoney = value => {
    return parseFloat(value).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}