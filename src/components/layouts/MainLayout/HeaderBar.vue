<template>
    <q-header reveal bordered>
        <q-toolbar>
            <q-btn flat @click="toggleLeftDrawer" round dense icon="menu" />
            <q-icon name="home" size="2rem"></q-icon>Penomy
            <q-space />

            <q-input class="searchField" standout rounded dense label="Tìm kiếm" v-model="searchString" width="300px"
                bg-color="grey-4">
                <template v-slot:append>
                    <q-avatar color="black">
                        <q-icon name="search" color="white" />
                    </q-avatar>
                </template>
            </q-input>

            <q-space />
            <div class="right-side">
                <q-btn color="primary" size=".6em" padding="4px" dense unelevated filled label="Thể loại"
                    icon-right="expand_more" />
                <q-btn size=".6em" color="primary" padding="4px" dense unelevated filled label="Thể loại"
                    icon-right="expand_more" />
            </div>
            <q-btn round color="primary" size=".6rem">
                <q-avatar size="1.3rem" icon="account_circle" />
            </q-btn>
            <!-- </q-toolbar-title> -->
        </q-toolbar>
    </q-header>
</template>
<script setup>
import { ref } from 'vue';

var toggleLeftDrawer = ref(false);
var searchString = ref('');
</script>