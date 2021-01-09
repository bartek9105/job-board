const StorageService = {
  saveUser: function (user) {
    window.localStorage.user = JSON.stringify({ isLoggedIn: true, ...user })
  },
  removeUser: function () {
    window.localStorage.removeItem('user')
  }
}

export default StorageService