import api from './api.service'

const ProductService = {
  fetchProducts: async function () {
    try {
      const products = await api.get('products')
      return products.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProductService