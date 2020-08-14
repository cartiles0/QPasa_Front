<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-form ref="form">
          <v-card-title>
            <span class="headline">Log In</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col cols="12">
                <v-text-field
                  v-model="user_email"
                  label="Email*"
                  clearable=""
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user_password"
                  :append-icon="password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="password ? 'text' : 'password'"
                  label="Password*"
                  clearable=""
                  required
                  @click:append="password = !password"
                ></v-text-field>
              </v-col>
            </v-container>
            <v-btn text to="/auth/signup">
              <small class="link">Create An Account Here</small>
            </v-btn>
          </v-card-text>
          <v-col cols="12">
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="logInBack">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="login">Log In</v-btn>
            </v-card-actions>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user_email: '',
      user_password: '',
      password: false,
    }
  },
  methods: {
    logInBack() {
      this.$emit('logInBack')
    },
    login() {
      const data = {
        user_email: this.user_email,
        user_password: this.user_password,
      }
      this.$axios
        .$post('/auth/login', data)
        .then((response) => {
          if (!response.error) {
            localStorage.setItem('email', response.email)
            localStorage.setItem('token', response.token)
            window.location.href = '/'
          } else {
            window.alert(response.error)
          }
        })
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style scoped>
.link {
  color: blue;
}
</style>
