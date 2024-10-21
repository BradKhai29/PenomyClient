<template>
    <q-layout class="bg-light-300" view="hHh lpR fFf">
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

        <q-page-container>
            <penomy-avatar class="q-my-md" />
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { domainRootPath } from "../router/common/DomainRootPath";
import PenomyAvatar from "../components/common/auth/PenomyAvatar.vue";

const tabsDefinition = [
    {
        name: "login",
        label: "Đăng nhập",
        link: domainRootPath.auth + "/login",
    },
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
.auth-form,
.auth-form-padding {
    --min-width: 290px;
    --max-width: 424px;
    --padding-width: 28px;
}

.auth-input-margin-bottom {
    --margin-width: 20px;

    margin-bottom: var(--margin-width);
}

.auth-form-mb {
    margin-bottom: var(--padding-width);
}

.auth-form {
    border-radius: 12px !important;
    width: var(--max-width);
    max-width: var(--max-width) !important;
    height: min-content !important;
    padding: var(--padding-width);
}
</style>
