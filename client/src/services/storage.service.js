const StorageService = {
  saveUser: function (user) {
    window.localStorage.user = JSON.stringify({ isLoggedIn: true, ...user })
  },
  removeUser: function () {
    window.localStorage.removeItem('user')
  },
  getUserData: function () {
    return JSON.parse(window.localStorage.getItem('user'))
  }
}

export default StorageService