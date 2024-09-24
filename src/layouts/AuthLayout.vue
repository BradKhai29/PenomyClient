<template>
    <q-layout style="background-color: #eee;" view="hHh lpR fFf">

        <q-header bordered class="bg-white text-dark">
            <q-toolbar class="text-dark justify-center">
                <q-tabs class="no-capitalize" indicator-color="primary" v-model="tab" dense shrink narrow-indicator>
                    <q-route-tab v-for="tab in tabs" :to="tab.link" :key="tab.name" v-bind="tab" />
                </q-tabs>
            </q-toolbar>
        </q-header>

        <q-page-container class="column items-center">
            <div class="row q-my-lg">
                <q-avatar>
                    <img src="../assets/logo/penomy.png">
                </q-avatar>
                <div class="text-h6 q-py-sm">Penomy</div>
            </div>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script>
import { ref } from 'vue'
import { domainRootPath } from "../router/common/DomainRootPath";

const tabsDefinition = [
    { name: 'login', label: 'Đăng nhập', link: domainRootPath.auth + '/login' },
    { name: 'register', label: 'Đăng ký', link: domainRootPath.auth + '/register' },
    { name: 'forgotPassword', label: 'Quên mật khẩu', link: domainRootPath.auth + '/forgot-password' }
]

export default {
    setup() {
        return {
            tab: ref(''),
            tabs: ref(tabsDefinition)
        }
    }
}
</script>

<style>
.q-card {
    border-radius: 16px;
}

a {
    color: #78847e;
    text-decoration: none;
}

.q-btn {
    border-radius: 6px;
}
</style>