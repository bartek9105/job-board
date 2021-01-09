const StorageService = {
  saveUser: function (user) {
    window.localStorage.user = JSON.stringify({ isLoggedIn: true, ...user })
  },
  removeUser: function () {
    window.localStorage.removeItem('user')
  },
  getUser: function () {
    return JSON.parse(window.localStorage.getItem('user')).id
  }
}

export default StorageService