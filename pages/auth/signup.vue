<template>
  <v-row justify="center">
    <v-col>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Create Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user_name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user_lastName"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user_username"
                  label="Username*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user_email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
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
                <!-- <v-text-field
                v-model="user_password"
                label="Password*"
                hint="Needs to be at least 6 characters long"
                type="password"
                required
              ></v-text-field> -->
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
              <v-text-field
                :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="password2 ? 'text' : 'password'"
                label="Confirm Password"
                value="12345678"
                hint="At least 8 characters"
                required
                @click:append="password2 = !password2"
              ></v-text-field>
            </v-col> -->
              <v-col cols="12">
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
        <v-card-actions>
          <v-btn color="blue darken-1" text to="/">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="signup">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user_name: 'Carlos',
      user_lastName: 'Artiles',
      user_username: '',
      user_email: '',
      user_password: '12345678',
      user_areaPreference: 'Arucas',
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
    async signup() {
      const data = {
        user_name: this.user_name,
        user_lastName: this.user_lastName,
        user_username: this.user_username,
        user_email: this.user_email,
        user_password: this.user_password,
        user_areaPreference: this.user_areaPreference,
      }

      const ip = await this.$axios.$post('/auth/signup', data)

      localStorage.setItem('token', ip.token)
      localStorage.setItem('email', ip.email)

      this.ip = ip

      this.reset()

      window.location.href = '/'
    },
  },
}
</script>

<style scoped>
.link {
  color: blue;
}
</style>
