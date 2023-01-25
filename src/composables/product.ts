interface PropsPrice {
  quantity: number
  price: number
}

export default function () {
  const tax = 0.16
  const percent = 0.5

  const calculatePrices = (data: PropsPrice) => {
    const priceWithoutTax = Number(data.price)
    const priceWithTax = Number(
      (priceWithoutTax * tax + priceWithoutTax).toFixed(2)
    )
    const priceWithoutTaxUnitary = Number(
      (priceWithoutTax / data.quantity).toFixed(2)
    )
    const priceWithTaxUnitary = Number(
      (priceWithoutTaxUnitary * tax + priceWithoutTaxUnitary).toFixed(2)
    )
    const revenue = Number((priceWithTaxUnitary * percent).toFixed(2))
    const pricePublicUnitary = Number(
      (priceWithTaxUnitary + revenue).toFixed(2)
    )
    const pricePublic = Number((pricePublicUnitary * data.quantity).toFixed(2))

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
