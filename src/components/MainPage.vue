<template>
  <div class="main_wrapper">
    <nav class="navigation">
      <ul class="navigation_list">
        <li class="navigation_list-item">
          <router-link to="/authorization" class="navigation_list-link">Авторизация</router-link>
        </li>
        <li class="navigation_list-item" v-if="key">
          <router-link to="/analytics" class="navigation_list-link">Аналитика</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MainPage",
  computed: {
    key() {return this.$store.state.key},
  },
  beforeMount() {
    this.$store.commit("getSiteId");
    if (this.key == null) {this.$router.replace("/")}
  },
};
</script>

<style scoped>
.main_wrapper {
  height: 100vh;
  width: 100vw;
  color: #ffffff;
  background-image: linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) ), url('/src/assets/background2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.navigation {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4402e0;
}
.navigation_list {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.navigation_list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
}
.navigation_list-link {
  text-decoration: none;
  font-size: 17px;
  color: #ffffff;
  transition: all 0.2s linear;
}
.navigation_list-link:hover,
.navigation_list-link:focus {
  cursor: pointer;
  font-size: 20px;
}
@media screen and (max-width: 480px) {
  .navigation_list {
    width: 75%;
  }
}
</style>
