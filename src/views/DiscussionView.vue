<template>
    <div class="container content">
        <div class="card-body height3" style="margin-top: 20px;">
            <ul class="chat-list">
                
                <li v-for="(message, index) in messages" :key="index"  :class="message.user_id === user ? 'out':'in'">
                    <div>
                    <div class="chat-img">
                        <img alt="Avtar" src="@/assets/user.svg">
                    </div>
                    <div style="margin-right: 160px;" class="chat-body">
                        <div class="chat-message">
                            <!-- <h5>ise Wa</h5> -->
                            <p>{{message.discussion}}</p>
                            <div v-if="message.favori ? message.favori.user_id == user :'' ">
                                    <p @click="deletFavoris(message.favori.id)"><i  class="mdi mdi-heart"></i></p> 
                            </div>
                            <div v-else>
                                    <p @click="favoris(message.id)"><i height="65px" class="mdi mdi-heart-outline"></i></p> 
                            </div>
                            
                        </div>
                    </div>
            </div>
        </li>
                

            </ul>
        </div>
            
    <div class="card-footer">
        <form @submit.prevent="createMessage()">
            <div class="input-group">
                <textarea id="form6Example7" rows="4" cols="100" v-model="discussion"  class="form-control type_msg" placeholder="Message..."></textarea>
                    <Button class="btn" type="submit" label="Envoyer" />
            </div>
        </form>
    </div>
</div>
</template>
<script>


import axios from 'axios';
import store from '/src/store';
import Button from 'primevue/button';
export default {
    name: "DiscussionView",
    components:{
        Button,
    },
    data(){
        return{
            discussion:'',
            messages:[],
            user:store.state.data.user.id,
        }
    },
    mounted(){
        var str = document.location.href;
        var urls = new URL(str);
            setInterval(() => {
                if(urls.origin+`/discussion/${this.$route.params.id ? this.$route.params.id :''}` == `http://localhost:8080/discussion/${this.$route.params.id}` && this.$route.params.id != 'undefined'){
                    this.getMessage();
                // console.log(urls.origin+`/discussion/${this.$route.params.id ? this.$route.params.id :''}`);
                }
            
            }, 3000);
      
      
    },
    methods:{

        async deletFavoris(id) {
          
           await axios
               .delete(`http://127.0.0.1:8000/api/favori/${id}`, {
                  
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
                  
                  this.getMessage()
                
               })
               .catch(function (error) {
                   console.error(error);
               });
       },

        async favoris(id) {
           
            await axios
                .post(`http://127.0.0.1:8000/api/favoris/${id}`, {
                   
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
                   
                   this.getMessage()
                 
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        async getMessage(){
            await   axios.get(`http://127.0.0.1:8000/api/discussion/${this.$route.params.id}`, {

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${store.state.data.token}`,
            },
            }).then(response => {
                this.messages = response.data.discussions
            })
        },


        

        async createMessage() {
            await axios
                .post(`http://127.0.0.1:8000/api/discussions_group/${this.$route.params.id}`, {
                    discussion: this.discussion,
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
                   this.getMessage()
                 this.discussion = '';
                })
                .catch(function (error) {
                    console.error(error);
                });
        },



    },

}

</script>

<style scoped>
   body {
        background: #eee;
    }

    .chat-list {
        padding: 0;
        font-size: .8rem;
    }

    .chat-list li {
        margin-bottom: 10px;
        overflow: auto;
        color: #ffffff;
    }

    .chat-list .chat-img {
        float: left;
        width: 48px;
    }

    .chat-list .chat-img img {
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        width: 100%;
    }

    .chat-list .chat-message  {
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background: #5a99ee;
        display: inline-block;
        padding: 10px 20px;
        position: relative;
        margin: 5px;
    }

    .chat-list .chat-message:before {
        content: "";
        position: absolute;
        top: 15px;
        width: 0;
        height: 0;
    }

    .chat-list .chat-message h5 {
        margin: 0 0 5px 0;
        font-weight: 600;
        line-height: 100%;
        font-size: .9rem;
    }

    .chat-list .chat-message p {
        line-height: 18px;
        margin: 0;
        padding: 0;
    }

    .chat-list .chat-body {
        margin-left: -200px;
        float: left;
        width: 70%;
    }

    .chat-list .in .chat-message:before {
        left: -12px;
        border-bottom: 20px solid transparent;
        border-right: 20px solid #5a99ee;
    }

    .chat-list .out .chat-img {
        float: right;
    }

    .chat-list .out .chat-body {
        float: right;
        margin-right: -120px;
        text-align: right;

    }

    .chat-list .out .chat-message {
        background: #fc6d4c;
    }

    .chat-list .out .chat-message:before {
        right: -12px;
        border-bottom: 20px solid transparent;
        border-left: 20px solid #fc6d4c;
    }

    .card .card-header:first-child {
        -webkit-border-radius: 0.3rem 0.3rem 0 0;
        -moz-border-radius: 0.3rem 0.3rem 0 0;
        border-radius: 0.3rem 0.3rem 0 0;
    }

    .card .card-header {
        background: #17202b;
        border: 0;
        font-size: 1rem;
        padding: .65rem 1rem;
        position: relative;
        font-weight: 600;
        color: #ffffff;
    }

    .content {
        margin-top: 40px;
    }

    p {
        color: black;
    }
    .card-footer{
       
        margin-top: 400px;
        overflow: none;
    }
    .btn{
        margin-left: 10px;
    }
</style>