<template>
    <nav
        class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light ">
        <div class="navbar-wrapper">
            <div class="navbar-container content">
                <div class="collapse navbar-collapse show" id="navbar-mobile">
                    <ul class="nav navbar-nav mr-auto float-left">
                        <li class="nav-item d-block d-md-none"><a class="nav-link nav-menu-main menu-toggle hidden-xs"
                                href="#"><i class="ft-menu"></i></a></li>


                    </ul>
                    <ul class="nav navbar-nav float-left">
                        
                        <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link"
                                href="#" data-toggle="dropdown"> <span class="avatar avatar-online"><img
                                        src="@/assets/user.svg"
                                        alt="avatar"><i></i></span></a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="arrow_box_right"><a class="dropdown-item" href="#"><span
                                            class="avatar avatar-online"><img
                                                src="@/assets/theme-assets/images/portrait/small/avatar-s-19.png"
                                                alt="avatar" class="mx-1"><span class="user-name text-bold-700 mx-1 ">{{ this.$store.state.data.user.name }}</span></span></a>
                                    <div class="dropdown-divider"></div>
                                    <form method="post" @submit.prevent="logout()">
                                        <button class="btn btn-accent-1" type="submit"><i class="ft-power"></i>
                                            Déconnexion</button>
                                    </form>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import store from '/src/store';
import axios from 'axios';
export default {

    mounted() {
        axios.post()
    },

    methods: {
        async logout() {
            this.$router.replace({ name: 'LoginForm' });
            this.$store.commit("getData");
        },
    }
}
</script>
<style scoped></style>