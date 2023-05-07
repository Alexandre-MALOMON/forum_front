<template>
    <div class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click"
        data-menu="vertical-menu" data-color="bg-chartbg" data-col="2-columns">
        <TopBar />
        <div class="content d-flex align-item-center row">
            <div class="col-2">
                <SideBar />
            </div>

            <div class="outside w-75 justify-content-center col-9 m-auto">
                <div class="app-content content">
                    <div class="content-wrapper">
                        <div class="content-wrapper-before"></div>
                        <div class="content-header row">
                        </div>
                        <div class="content-body pt-5"><!-- Chart -->
                            <router-view />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import SideBar from '@/components/Dasboard/SideBar.vue';
import TopBar from '@/components/Dasboard/TopBar.vue';
import KanbanBoard from '../components/Dasboard/KanbanBoard.vue';



export default {
  components: { SideBar, TopBar, KanbanBoard,  },
 

}


</script>
<style scoped>
@import url("@/assets/theme-assets/css/vendors.css");
@import url("@/assets/theme-assets/vendors/css/charts/chartist.css");
@import url("@/assets/theme-assets/css/app-lite.css");
@import url("@/assets/theme-assets/css/core/menu/menu-types/vertical-menu.css");
@import url("@/assets/theme-assets/css/core/colors/palette-gradient.css");
@import url("@/assets/theme-assets/css/pages/dashboard-ecommerce.css");
</style>