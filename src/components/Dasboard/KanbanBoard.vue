<template>
    <div class="p-2 bg-blue-100 pt-5">
        <div class="row pt-5">
            <div class="col-xl-4 col-lg-6 col-md-12">
                <div class="card pull-up ecom-card-1 bg-white">
                    <div class="card-content ecom-card2 height-180">
                        <div class="d-flex align-items-center justify-content-between p-2">
                            <h6 class="text-muted danger p-1">Nombre Total de Projets</h6>
                            <i class="ft-user danger font-large-1 float-right p-1"></i>
                        </div>
                        <div class="progress-stats-container ct-golden-section height-75 position-relative pt-3  ">
                            <div id="progress-stats-bar-chart">
                                <h2 class="">{{ projects.length }}</h2>
                            </div>
                            <div id="progress-stats-line-chart" class="progress-stats-shadow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-xl-4 col-lg-6 col-md-12">
                <div class="card pull-up ecom-card-1 bg-white">
                    <div class="card-content ecom-card2 height-180">
                        <div class="d-flex align-items-center justify-content-between p-2">
                            <h6 class="text-muted info  p-1">Nombre Total de Collaborations</h6>
                            <i class="ft-users info font-large-1 float-right p-1"></i>
                        </div>
                        <div class="progress-stats-container ct-golden-section height-75 position-relative pt-3">
                            <div id="progress-stats-bar-chart1">
                                <h2>4</h2>
                            </div>
                            <div id="progress-stats-line-chart1" class="progress-stats-shadow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="card pull-up ecom-card-1 bg-white">
                    <div class="card-content ecom-card2 height-180">
                        <div class="d-flex align-items-center justify-content-between p-2">
                            <h6 class="text-muted warning p-1">Sales Stats</h6>
                            <i class="ft-shopping-cart warning font-large-1 float-right p-1"></i>
                        </div>
                        <div class="progress-stats-container ct-golden-section height-75 position-relative pt-3">
                            <div id="progress-stats-bar-chart2"></div>
                            <div id="progress-stats-line-chart2" class="progress-stats-shadow"></div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

    </div>
</template>
  
<script >

import Draggable from "vuedraggable";
import axios from 'axios'
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import store from '/src/store'
export default {
    data() {
        return { 
            tasks: [],
            projects: [],
            meals: [
                'Hamburger',
                'Pizza',
                'Spaghetti',
                'Tacos',
                'Teriyaki Chicken',
            ]
        }
    },
    components: {
        Draggable, Button,
        Dialog,
        DataTable,
        Column,
        InputText
    },

    computed: {
        taskDragOptions() {
            return {
                animation: 200,
                group: "task-list",
                dragClass: "status-drag"
            };
        }
    },
    mounted() {
        axios.get(`http://127.0.0.1:8000/api/project`, {

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${store.state.data.token}`,
            },
        }).then(response => {
            this.projects = response.data.projects
            console.log(this.projects)
        })
    },

    methods: {
        handleTaskMoved() {
            axios.put("/tasks/sync", { columns: this.statuses }).catch(err => {
                console.log(err.response);
            });
        }
    }
};
</script>
  
<style scoped>
.status-drag {
    transition: transform 0.5s;
    transition-property: all;
}
</style>
  