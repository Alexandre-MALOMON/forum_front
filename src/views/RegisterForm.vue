<template >
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <div class="img">
                            <img src="@/assets/large.png" alt="logo">
                        </div>
                        <div class="login-wrap p-4 p-md-5">
                            <div class="d-flex">
                                <div class="w-100">
                                    <h3 class="mb-4">Inscription</h3>
                                </div>

                            </div>
                            <form method="post" class="signin-form" @submit.prevent="register()">
                                <div class="form-group mb-3">
                                    <label class="label" for="name">Nom d'utilisateur</label>
                                    <input type="text" class="form-control" placeholder="Nom d'utilisateur" v-model="name"
                                        required>
                                </div>
                                <div class="form-group mb-3">
                                    <label class="label" for="name">Email</label>
                                    <input type="email" class="form-control" placeholder="Email" v-model="email" required>
                                </div>
                                <div class="form-group mb-3">
                                    <label class="label" for="password">Mot de passe</label>
                                    <input type="password" class="form-control" placeholder="Mot de passe"
                                        v-model="password" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit"
                                        class="form-control btn btn-primary rounded submit px-3">S'inscrire</button>
                                </div>
                            </form>
                            <p class="text-center">Vous avez déja un compte? <router-link to="/"
                                    data-toggle="tab">Connexion</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    name: "RegisterForm",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            user: {}
        }
    },
    methods: {
        async register() {

            await axios
                .post(
                    `http://127.0.0.1:8000/api/register`,
                    {
                        name: this.name,
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
                    console.log(this.user)
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

@import url("@/assets/css/style1.css");
</style>