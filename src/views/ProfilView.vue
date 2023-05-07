<template>
    <div>
        <section class="profil">
            <div class="photo">
                <img src="@/assets/user.svg" alt="" height="300"/>
            </div>
            <div class="infos">
                <div class="nom">
                    <p>Nom: {{ nom }}</p>
                </div>
                <div class="nom">
                    <p>E-mail: {{email}}</p>
                </div>
               
                <div >
                    <button @click="logout()" class="btn btn-danger">Déconnexion</button>
                </div>
            </div>
        </section> 
    </div>
</template>
<script>
import store from '/src/store';
export default {
    name: 'ProfilView',

    data(){
        return{
            nom:store.state.data.user.name,
            email:store.state.data.user.email
        }
    },
    components:{

    },

    methods:{
        async logout() {
            this.$router.replace({ name: 'LoginForm' });
            this.$store.commit("getData");
        },
    }
}
</script>
<style  scoped>
    .profil{
        display: flex;
        margin-top: 90px;
        justify-content: space-evenly;
        border: solid 1px white;
        border-radius: 5px;
        padding: 10px;
        width: 900px;
        background-color: rgb(252, 255, 240);
    }
    .infos{
        margin-top: 90px;
        text-align: start;
    }
    .nom{
        font-weight: bold;
    }
</style>