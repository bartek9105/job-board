module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/assets/css/main.scss"; @import "@/assets/css/variables.scss"; @import "@/assets/css/mixins.scss";`
        }
      }
    }
  };