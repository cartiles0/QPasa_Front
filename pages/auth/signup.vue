<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-form ref="form">
          <v-card-title>
            <span class="headline">Create Account</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="4">
                  <v-text-field
                    v-model="user_name"
                    label="Name*"
                    autofocus=""
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="4">
                  <v-text-field
                    v-model="user_lastName"
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-text-field
                    v-model="user_username"
                    label="Username*"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-text-field
                    v-model="user_email"
                    type="email"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="8">
                  <v-text-field
                    v-model="user_password"
                    :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="password1 ? 'text' : 'password'"
                    label="Password*"
                    hint="At least 8 characters"
                    counter
                    required
                    @click:append="password1 = !password1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-select
                    v-model="user_areaPreference"
                    :items="[
                      'Las Palmas de Gran Canaria',
                      'Telde',
                      'Agaete',
                      'Agüimes',
                      'Artenara',
                      'Arucas',
                      'Firgas',
                      'Gáldar',
                      'Ingenio',
                      'La Aldea de San Nicolás',
                      'Mogán',
                      'Moya',
                      'San Bartolomé de Tirajana',
                      'Santa Brígida',
                      'Santa Lucía de Tirajana',
                      'Santa María de Guía',
                      'Tejeda',
                      'Teror',
                      'Valleseco',
                    ]"
                    label="Area of Preference*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-btn text to="/auth/login">
              <small class="link">Already have an account?</small>
            </v-btn>
          </v-card-text>
          <v-col cols="12" lg="8">
            <v-card-actions>
              <v-btn color="blue darken-1" text to="/">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="signup">Submit</v-btn>
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
      user_name: '',
      user_lastName: '',
      user_username: '',
      user_email: '',
      user_password: '',
      user_areaPreference: '',
      password1: false,
      password2: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        passwordMatch: () => "The password you entered doesn't match!",
      },
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    signup() {
      const data = {
        user_name: this.user_name,
        user_lastName: this.user_lastName,
        user_username: this.user_username,
        user_email: this.user_email,
        user_password: this.user_password,
        user_areaPreference: this.user_areaPreference,
      }

      this.$axios
        .$post('/auth/signup', data)
        .then((response) => {
          if (!response.error) {
            localStorage.setItem('email', response.email)
            localStorage.setItem('token', response.token)
            window.location.href = '/'
          } else {
            window.alert('Please fill out the form correctly!')
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
