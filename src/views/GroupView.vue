<template>
    <div>
        <div class="group_create">
            <Button  label="Nouveau groupe" icon="pi pi-plus" @click="visible = true" />
            
        </div>
        <section class="group_item" >
           <div v-for="(groupe, index) in groupes" :key="index" >
                <div class="group">
                    <div class="group_icon">
                        <img src="@/assets/user.svg" height="60" alt="">
                    </div>
                    <div class="group_title">
                        <p>{{groupe.name}}</p>
                        <p>Créer par : {{groupe.user.name}}</p>
                    </div>
                        <div v-if="groupe.integre.user_id != user" >
                            <button  @click="intgrer(groupe.id)" class="btn btn-warning">Integrer</button>
                        </div>
                        <div v-else>
                            <button   class="btn btn-primary">Membre</button>
                        </div>
                        
                </div>
                <hr>
            </div>
          
        </section>
    </div>
    <Dialog v-model:visible="visible" modal header="Créer un nouveau groupe" :style="{ width: '25vw' }">
        <div class="d-flex justify-content-center w-100">
            <form @submit.prevent="createGroupes()" class="flex flex-column gap-2">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nom du groupe</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" required v-model="name">
                </div>
                <small class="p-error" id="text-error"></small>
                <Button type="submit" label="Créer" severity="success" />
            </form>
        </div>
    </Dialog>
</template>
<script>
import axios from 'axios';
import store from '/src/store';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
export default {
    name:'GroupView',
    data(){
        return{
            groupes:[],    
            visible: false,
            user:store.state.data.user.id,
            integres:[],
            groups:[],
            name:''
        }
    },
    components:{
        Button,
        Dialog,
        InputText
    },
    mounted(){
        this.getGroups();
        this.getGroupIntegrer();
    },

    methods:{
        async getGroups(){
             await   axios.get(`http://127.0.0.1:8000/api/group`, {

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${store.state.data.token}`,
            },
            }).then(response => {
                this.groupes = response.data.group
                console.log(this.groupes)
            })
        },

        async getGroupIntegrer(){
             await   axios.get(`http://127.0.0.1:8000/api/group/integrer`, {

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${store.state.data.token}`,
            },
            }).then(response => {
                this.groups = response.data.groups
                console.log(this.groups)
            })
        },


        async createGroupes() {
        this.visible= false;
        //this.loading = true;
        await axios
            .post(`http://127.0.0.1:8000/api/group/store`, {
                name: this.name,
            },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json", 
                        'Authorization': `Bearer ${store.state.data.token}`,
                    },
                }
            )
            .then(response => {
                console.log(response.data);
                this.getGroups()
            })
            .catch(function (error) {
                console.error(error);
        });
    },


        async intgrer(id) {
            await axios
                .post(`http://127.0.0.1:8000/api/integration/${id}`, {
                },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json", 
                            'Authorization': `Bearer ${store.state.data.token}`,
                        },
                    }
                )
                .then(response => {
                    this.getGroups();
                    this.getGroupIntegrer()
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

    
    },

    
}



</script>
<style scoped>
    .group{
        display:flex;
        justify-content: space-around;
        border: none 1px white;
        padding: 10px;
        border-radius: 5px;
        width: 500px;
        background-color: rgb(252, 255, 240);
        align-items: center;
        
    }
    .group_item{
        margin-top:90px;
        width: 500px;
    }
    .group_create{
        float:right;
    }
    
</style>