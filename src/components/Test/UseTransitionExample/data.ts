import {faker} from '@faker-js/faker'

enum Color {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

export type Product = {
  id: string,
  name: string,
  description: string,
  material: string,
  price: string,
  department: string,
  quantity: number,
  color: Color
}

export const products = new Array(1500).fill(null).map(()=>{
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    quantity: faker.number.int({min: 1, max: 100}),
    color: faker.helpers.enumValue(Color)
  }
})