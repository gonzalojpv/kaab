interface PropsPrice {
  quantity: number
  price: number
}

export default function () {
  const tax = 0.16
  const percent = 0.5

  const calculatePrices = (data: PropsPrice) => {
    const priceWithoutTax = Number(data.price)
    const priceWithTax = priceWithoutTax * tax + priceWithoutTax
    const priceWithoutTaxUnitary = priceWithoutTax / data.quantity
    const priceWithTaxUnitary = priceWithoutTax * tax + priceWithoutTaxUnitary
    const revenue = priceWithTaxUnitary * percent
    const pricePublicUnitary = Number(priceWithTaxUnitary) + Number(revenue)
    const pricePublic = pricePublicUnitary * data.quantity

    return {
      priceWithoutTax,
      priceWithTax,
      priceWithoutTaxUnitary,
      priceWithTaxUnitary,
      revenue,
      pricePublicUnitary,
      pricePublic
    }
  }
  return {
    calculatePrices
  }
}
