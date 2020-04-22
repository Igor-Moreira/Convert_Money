const convert = (quotation, amount) =>{
    return quotation * amount
}
const toMoney = value => {
    return parseFloat(value).toFixed(4)
}

module.exports = {
    convert,
    toMoney
}
