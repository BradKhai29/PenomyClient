<template>
    <q-layout style="background-color: #eee" view="hHh lpR fFf">
        <q-header bordered class="bg-white text-dark">
            <q-toolbar class="text-dark justify-center">
                <q-tabs
                    class="no-capitalize"
                    indicator-color="primary"
                    v-model="tab"
                    dense
                    shrink
                >
                    <q-route-tab
                        class="text-subtitle1 q-px-sm"
                        no-caps
                        v-for="tab in tabs"
                        :to="tab.link"
                        :key="tab.name"
                        v-bind="tab"
                    />
                </q-tabs>
            </q-toolbar>
        </q-header>

        <q-page-container class="column items-center">
            <penomy-avatar class="q-my-lg"></penomy-avatar>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { domainRootPath } from "../router/common/DomainRootPath";
import PenomyAvatar from "../components/common/auth/PenomyAvatar.vue";

const tabsDefinition = [
    { name: "login", label: "Đăng nhập", link: domainRootPath.auth + "/login" },
    {
        name: "register",
        label: "Đăng ký",
        link: domainRootPath.auth + "/register",
    },
    {
        name: "forgotPassword",
        label: "Quên mật khẩu",
        link: domainRootPath.auth + "/forgot-password",
    },
];

const tab = ref("");
const tabs = ref(tabsDefinition);
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
