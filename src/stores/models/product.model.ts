export interface Product {
  name: string
  brand?: string
  quantity: number
  price: number
  code: string
  barCode: string
  priceWithoutTax: number
  priceWithTax: number
  priceWithoutTaxUnitary: number
  priceWithTaxUnitary: number
  pricePublic: number
  pricePublicUnitary: number
  revenue: number
  stock: number
  link?: string
  photo?: string
  tony?: string
}
