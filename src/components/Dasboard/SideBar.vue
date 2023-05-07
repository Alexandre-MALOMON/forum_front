<template>
    <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true"
        data-img="@/assets/theme-assets/images/backgrounds/02.jpg">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto align-items-center d-flex"><router-link class="navbar-brand" to=""><img class="brand-logo"
                            alt="logo" src="@/assets/large.png" height="40"/>
                        <h3 class="brand-text">Diskut</h3>
                    </router-link ></li>
                <li class="nav-item d-md-none"><a class="nav-link close-navbar"><i class="ft-x"></i></a></li>
            </ul>
        </div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                <li class="">
                    <div class="search-wrapper">
                        <input type="text" v-model="search" placeholder="Recherche de groupe..."/>
                    </div>    
               </li>
                
                <li class=" nav-item"><router-link to="/profil"><i class="mdi mdi-account-circle-outline"></i><span class="menu-title"
                            data-i18n="">Profil</span></router-link>
                </li>
                <li class=" nav-item"><router-link to="/group"><i class="mdi mdi-account-supervisor-outline"></i><span class="menu-title"
                            data-i18n="">Groupes</span></router-link>
                </li>
                <li v-for="group of resultQuery" :key="group.id" class=" nav-item"><router-link :to="{ path: '/discussion/' + group.id }"><img class="brand-logo"
                            alt="logo" src="@/assets/user.svg" height="50"/><span class="menu-title"
                            data-i18n="">{{group.name}}</span></router-link>
                </li>
               

            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import store from '/src/store';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
export default {

data(){
   return{
    groups:[],
    visible: false,
    name:'',
    search:''
   }
},
components: {
        Button,
        Dialog,
        InputText
    },
mounted(){
      var str = document.location.href;
     var urls = new URL(str);
         setInterval(() => {
            if(urls.origin+urls.pathname === 'http://localhost:8080/group'){
                this.getGroup();
                console.log('po');
            }else{
                this.getGroup();
            }
        }, 6000); 
        //  this.getGroup();

},
computed: {
    resultQuery() {
      if (this.search) {
        return this.groups.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.groups;
      }
    }
  },
methods:{
    async getGroup(){
       
        await   axios.get(`http://127.0.0.1:8000/api/group/integrer`, {

        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${store.state.data.token}`,
        },
        }).then(response => {
            this.groups = response.data.groups
            
        })
    },

}
}

</script>
<style scoped>
.main-menu.menu-light .navigation>li>a {
    text-align: start;
}
.main-menu.menu-light .navigation>li>a:hover {
  color: #68AFF0 !important;
}

.menu-title {
    margin-left: 10px;
}

.main-menu.menu-shadow {
    -webkit-box-shadow: 0px 0 2px rgba(0, 0, 0, .1) !important;
}


</style>