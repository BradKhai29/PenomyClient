<template>
    <q-card
        class="q-pa-sm"
        style="background-color: #f9fafc"
        :style="$q.screen.lt.md ? { width: '90%' } : { width: '25%' }"
    >
        <q-card-section class="row justify-center">
            <div
                class="text-subtitle1 col-md-auto bg-primary-700 text-primary q-px-sm"
                style="border-radius: 4px"
            >
                Đăng nhập
            </div>
        </q-card-section>
        <q-card-section>
            <q-form>
                <q-input
                    label="Email"
                    class="bg-white q-mb-md"
                    v-model="login.email"
                    outlined
                    color="green"
                />
                <q-input
                    label="Nhập mật khẩu"
                    class="bg-white q-mt-md"
                    :type="isPwd ? 'password' : 'text'"
                    v-model="login.password"
                    outlined
                    color="green"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
                <div class="row justify-between q-my-sm">
                    <q-checkbox
                        v-model="left"
                        label="Giữ đăng nhập"
                        checked-icon="check_circle"
                        unchecked-icon="check_circle_outline"
                        color="primary"
                        dense
                        :size="$q.screen.lt.sm ? 'sm' : 'lg'"
                    />
                    <router-link
                        style="vertical-align: middle"
                        class="col-6 text-right q-py-sm"
                    >
                        <q-btn dense flat no-caps> Quên mật khẩu? </q-btn>
                    </router-link>
                </div>
                <div class="column">
                    <q-btn
                        class="col-12 bg-primary text-dark text-subtitle1 text-bold q-py-sm"
                        type="submit"
                        no-caps
                    >
                        Đăng nhập</q-btn
                    >
                    <div style="color: #78847e" class="q-my-md text-center">
                        Hoặc đăng nhập với
                    </div>
                    <q-btn type="button" class="q-py-sm" no-caps>
                        <q-icon name="fa-brands fa-google" class="" />
                        <span class="q-ml-xs text-subtitle1 text-weight-bold"
                            >Google</span
                        >
                    </q-btn>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
import { ref } from "vue";

export default {
    data() {
        return {
            login: {
                email: "",
                password: "",
            },
        };
    },
    setup() {
        return {
            left: ref(true),
            isPwd: ref(true),
        };
    },
    methods: {
        checker() {
            console.log("login");
        },
    },
};
</script>
