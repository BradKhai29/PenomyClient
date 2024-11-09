<template>
    <q-page>
        <section class="column q-pa-md q-gutter-md">
            <div class="text-subtitle1">
                <div style="width: 500px; word-wrap: break-word">
                    <span> Access Token: {{ accessToken ?? "null" }} </span>
                </div>
                <div class="col-grow q-pa-sm border-radius-sm shadow-1 column">
                    <div class="bg-dark text-light shadow-1 q-pa-sm">
                        <div>IAT</div>
                        <div class="q-pl-md">
                            From time:
                            <span>{{
                                tokenPayload?.iat - getDateTimeNow()
                            }}</span>
                        </div>
                        <div class="q-pl-md">
                            Value: <span>{{ tokenPayload?.iat }}</span>
                        </div>
                    </div>
                    <div class="bg-dark text-light shadow-1 q-pa-sm">
                        <div>EXP</div>
                        <div class="q-pl-md">
                            From time:
                            <span>{{ leftTime }}</span>
                        </div>
                        <div class="q-pl-md">
                            Value: <span>{{ tokenPayload?.exp }}</span>
                        </div>
                    </div>
                    <div>
                        Purpose: <span>{{ tokenPayload?.purpose }}</span>
                    </div>
                </div>
            </div>
            <div class="text-subtitle1">
                Refresh Token: {{ refreshToken ?? "null" }}
            </div>
            <div class="text-subtitle1">
                Refresh Token Result: {{ refreshTokenResult ?? "null" }}
            </div>
        </section>
        <div class="q-mx-md">
            <q-btn @click="getAccessToken" class="bg-dark text-light">
                Get the token
            </q-btn>
        </div>
    </q-page>
</template>

<script>
import { useAuthStore } from "src/stores/common/AuthStore";
import { DecodeJwtPayload, JwtTokenHelper } from "src/helpers/JwtTokenHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { authStoreManager } from "src/stores/common/AuthStore.InternalManager";
const authStore = useAuthStore();

export default {
    name: "CreatorStudio1Page",
    components: {},
    data() {
        return {
            pageNumber: 1,
            refreshTokenResult: null,
            tokenPayloadRef: null,
            leftTime: 0,
            refreshToken: null,
        };
    },
    async mounted() {
        this.refreshToken = authStore.refreshToken;
    },
    methods: {
        getDateTimeNow() {
            return Math.ceil(Date.now() / 1000);
        },
    },
    computed: {
        /**
         * @type {DecodeJwtPayload} Payload type.
         */
        tokenPayload() {
            const tokenPayload = JwtTokenHelper.decodeJwt(this.accessToken);

            return tokenPayload;
        },
        accessToken() {
            return authStoreManager.tokenBag.accessToken;
        },
    },
};
</script>

<style scoped>
</style>
