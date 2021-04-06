import ProductService from '../../services/product.service'

export default ({
  state: {
    products: []
  },
  getters: {
    getProducts(state) {
      return state.products.data
    }
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const products = await ProductService.fetchProducts()
        commit('SET_PRODUCTS', products)
      } catch (error) {
        console.log(error)
      }
    }
  }
})