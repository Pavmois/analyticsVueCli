<template>
  <div class="authotization">
    <h2 class="title">
      <a href="https://leadhit.ru/" target="_blank" class="title_link"></a>
    </h2>
    <div class="form">
      <input
        type="text"
        class="id_input"
        v-model="inputId"
        maxlength="24"
        placeholder="Введите ID сайта"
        @keydown.enter="sendId"
      />
      <button @click="sendId" class="sign_in_btn">Войти</button>
    </div>
    <span v-if="inputNotFilled" class="form_error">
       Символов в ID сайта - <span class="orange">{{inputId.length}}</span> .
      <br>
      <br>
      ID сайта не может быть меньше <span class="orange">24</span> символов.
      <br>
      Наример: 5f8475902b0be670555f1bb3</span>
    <span class="form_error" v-if="this.$store.state.notValidKey">Введён неверный ID, попробуйте снова</span>
  </div>
</template>

<script>
export default {
  name: "AuthorizationPage",
  data() {
    return {
      inputId: "",
      inputNotFilled: false,
    };
  },
  methods: {
    sendId() {
      if (this.inputId.length == 24) {
        this.$store.dispatch("sendSiteId", this.inputId);
      } else {
        this.inputNotFilled = true;
      }
    },
  },
  watch: {
    inputId() {
      this.inputNotFilled = false;
    },
  },
};
</script>

<style scoped>
.authotization {
  width: 100%;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title_link {
  display: block;
  width: 200px;
  height: 100px;
  background-image: url('/src/assets/LeadHit.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.title {
  margin-bottom: 50px;
  font-size: 30px;
}
.form {
  display: flex;
}
.id_input {
  font-size: 17px;
  padding: 3px 45px;
}
.id_input:focus {
  outline: none;
  border: 1px solid #ff4402;
}
.sign_in_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  background-color: #ff4402;
  color: #fff;
  font-size: 17px;
}
.sign_in_btn:hover {
  background-color: #ff4402e0;
  transition: all 0.4s linear;
  cursor: pointer;
}
.form_error {
  margin-top: 20px;
  padding: 5px;
  border: 2px solid #ff4402;;
  border-radius: 5px;
  color: #000;
  background-color: #fff;
}
.orange {
    color: #ff4402;
  }
</style>
