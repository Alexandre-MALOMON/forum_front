<template >
    <section class="ftco-section">
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <div class="img">
                            <img src="@/assets/large.png" alt="logo" >
                        </div>
                        <div class="login-wrap p-4 p-md-5">
                            <div class="d-flex">
                                <div class="w-100">
                                    <h3 class="mb-4">Connexion</h3>
                                </div>

                            </div>
                            <form method="post" class="signin-form" @submit.prevent="login()">
                                <div class="form-group mb-3">
                                    <label class="label" for="name">E-mail d'utilisateur</label>
                                    <input type="text" class="form-control" placeholder="Nom d'utilisateur" v-model="email"
                                        required>
                                </div>
                                <div class="form-group mb-3">
                                    <label class="label" for="password">Mot de passe</label>
                                    <input type="password" class="form-control" placeholder="Mot de passe"
                                        v-model="password" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit"
                                        class="form-control btn btn-primary rounded submit px-3">Connexion</button>
                                </div>
                                <div class="form-group d-md-flex">

                                    <div class="w-100 text-md-right">
                                        <a href="#">Mot de passe oublié?</a>
                                    </div>
                                </div>
                            </form>
                            <p class="text-center">Pas de compte? <router-link to="/register"
                                    data-toggle="tab">Inscription</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    name: "LoginForm",
    data() {
        return {
            email: '',
            password: '',
            user:{}
        }
    },
    methods: {

        async login() {

            await axios
                .post(
                    `http://127.0.0.1:8000/api/login`,
                    {
                        email: this.email,
                        password: this.password,
                    },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    this.user = response.data
                    if (response.status == '200') {
                        this.$router.replace({ name: 'DashboardView' });
                        this.$store.commit("getData", this.user);
                    }

                })
                .catch((e) => {
                    console.error(e);
                });
        },
    },
}
</script>
<style scoped >
label {
    text-align: start !important;
    width: 100%;
}

@import url("@/assets/css/style1.css");</style>