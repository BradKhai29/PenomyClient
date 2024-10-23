<template>
    <section
        class="q-ma-sm bg-light auth-form shadow-1 text-dark-500 text-subtitle1"
    >
        <div class="row justify-center auth-input-margin-bottom">
            <span
                v-if="error"
                class="border-radius-sm col-md-auto bg-secondary-100 text-secondary-900 q-px-sm"
            >
                Xử lý thất bại
            </span>
            <span
                v-else
                class="border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
            >
                Đang xử lý
            </span>
        </div>
        <div id="input-section flex justify-center">
            <div
                class="q-mb-md text-center"
                :class="{ 'text-secondary-500': error }"
            >
                {{ errorMessage ?? "Hệ thống đang xử lý" }}
            </div>

            <section class="flex justify-center q-mb-md">
                <div v-if="!error" class="loader"></div>
                <div v-else>
                    <q-icon
                        class="text-secondary-900"
                        name="report"
                        size="80px"
                    />
                </div>
            </section>

            <div class="column">
                <q-btn
                    v-if="error"
                    @click="goToRegister"
                    class="border-radius-md bg-secondary-100 text-secondary-900 text-subtitle1 text-bold q-py-sm"
                    no-caps
                >
                    Về trang đăng ký
                </q-btn>
                <q-btn
                    v-else
                    class="border-radius-md bg-light-300 text-dark text-subtitle1 text-bold q-py-sm"
                    no-caps
                    disable
                >
                    Vui lòng chờ
                </q-btn>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        error: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: null,
        },
    },
    methods: {
        goToRegister() {
            this.$router.push("/auth/register");
        },
    },
};
</script>

<style scoped>
.loader {
    --dark: #120e36;
    --primary: #53bf94;

    width: 80px;
    aspect-ratio: 1;
    border-radius: 100%;
    border: 12px solid var(--dark);
    border-right-color: var(--primary);
    animation: l2 1s infinite linear;
}

@keyframes l2 {
    to {
        transform: rotate(1turn);
    }
}
</style>
