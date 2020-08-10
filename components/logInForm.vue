<template>
  <v-col>
    <v-form ref="form">
      <v-card-title>
        <span class="headline">Log In</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-text-field
              v-model="user_email"
              label="Email*"
              clearable=""
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
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
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card-actions>
          <v-btn color="blue darken-1" text to="/">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="login">Log In</v-btn>
        </v-card-actions>
      </v-col>
    </v-form>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      user_email: '',
      user_password: '',
      password: false,
    }
  },
}
</script>
