import { action, computed, observable } from 'mobx'
import { UsersApi, BrandsApi, Configuration, User, Brand } from 'booster-js-client'

class ApiSet {
  brands: BrandsApi
  users: UsersApi

  constructor () {
    // init with empty config to avoid nullable types
    this.brands = new BrandsApi()
    this.users = new UsersApi()

    // then with re-initable parameters
    this.init()
  }

  init () {
    const config: Configuration = {
      accessToken: localStorage.getItem('booster-token') || '',
    }
    this.brands = new BrandsApi(config)
    this.users = new UsersApi(config)
  }
}

class Store {
  @observable currentUser?: User
  @computed get user () {
    if (!this.currentUser) {
      this.fetchUser()
    }
    return this.currentUser
  }
  @action async fetchUser () {
    const res = await this.api.users.getMyself()
    this.currentUser = res.data.user
    return this.currentUser
  }

  currentBrands?: Brand[]
  @action async getBrands () {
    if (this.currentBrands) {
      return this.currentBrands
    }

    const res = await this.api.brands.listMyBrands()
    this.currentBrands = res.data.brands
    return this.currentBrands
  }

  public api = new ApiSet()
}

declare global {
  interface Window { store: any; }
}

const store = new Store()
window.store = store
export default store