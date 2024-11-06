<template>
    <q-page v-if="isLoading" class="row justify-center">
        <LoadingPlaceholder
            :error="invalidToken"
            :errorMessage="invalidToken ? 'Link đăng ký không hợp lệ' : null"
        />
    </q-page>
    <q-page v-if="!isLoading && !invalidToken" class="row justify-center">
        <section
            class="q-ma-sm bg-light auth-form shadow-1 text-dark-500 text-subtitle1"
        >
            <div class="row justify-center auth-input-margin-bottom">
                <span
                    class="border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
                >
                    Hoàn tất đăng ký
                </span>
            </div>
            <div id="input-section">
                <div class="q-mb-md text-center">
                    Tạo tài khoản mới và khám phá
                </div>
                <q-input
                    class="bg-light-300 q-mb-md text-subtitle1"
                    v-model="email"
                    disable
                    outlined
                    color="green"
                />
                <q-input
                    placeholder="Nhập nickname"
                    class="text-subtitle1 bg-white"
                    v-model="nickname"
                    outlined
                    color="green"
                    :error="hasErrorNickname"
                >
                    <q-tooltip
                        v-if="hasErrorNickname"
                        class="bg-primary"
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                    >
                        <strong class="text-subtitle2">
                            Nickname tối thiểu 8 ký tự
                        </strong>
                    </q-tooltip>
                    <template v-slot:append>
                        <q-btn dense flat>
                            <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                            >
                                <strong class="text-subtitle2"
                                    >Tạo ngẫu nhiên nickname</strong
                                >
                            </q-tooltip>
                            <q-icon
                                name="casino"
                                class="cursor-pointer"
                                @click="getRandomNickname"
                            />
                        </q-btn>
                    </template>
                </q-input>

                <PasswordInput
                    v-model="password"
                    :strictValidation="true"
                    :minLength="8"
                    @verifyInput="setPasswordInputCallback"
                    class="q-mb-md"
                />

                <div class="column">
                    <q-btn
                        class="border-radius-md bg-primary text-dark text-subtitle1 text-bold q-py-sm"
                        @click="confirmRegister"
                        :loading="isProcessing"
                        :disable="isProcessing"
                        no-caps
                    >
                        Đăng ký
                    </q-btn>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { StringHelper } from "src/helpers/StringHelper";
import { NumberHelper } from "src/helpers/NumberHelper";
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import PasswordInput from "src/components/common/auth/PasswordInput.vue";
import LoadingPlaceholder from "src/components/common/auth/LoadingPlaceholder.vue";
import { Auth3ApiHandler } from "src/api.handlers/auth/auth3Page/Auth3ApiHandler";

export default {
    components: {
        LoadingPlaceholder,
        PasswordInput,
    },
    data() {
        return {
            isLoading: true,
            invalidToken: false,
            isProcessing: false,
            email: "",
            nickname: "",
            password: "",
            passwordInput: null,
            showPassword: false,
            hasErrorNickname: false,
            registrationToken: null,
        };
    },
    beforeMount() {
        // Pre-validate the value of the token before getting into the mounted hook.
        // If token is empty, then notify error to user.
        this.registrationToken = this.$route.query.token;

        if (!this.registrationToken) {
            this.invalidToken = true;
            return;
        }

        // Try to decode the payload before send to api, if failed then notify error.
        const decodedPayload = JwtTokenHelper.decodeJwt(this.registrationToken);

        if (!decodedPayload) {
            this.invalidToken = true;
            return;
        }

        // Display the email get from the decoded payload.
        this.email = decodedPayload.email;
    },
    async mounted() {
        // If the invalidToken is true after pre-validation, then return.
        if (this.invalidToken) {
            return;
        }
        console.log("Hi");

        // Check if the token is valid or not.
        const result = await Auth3ApiHandler.verifyRegistrationTokenAsync(
            this.registrationToken
        );

        // If the token is invalid, then notify error to user.
        if (!result) {
            this.invalidToken = true;
            return;
        }

        // Turn off isLoading flag to display input for user.
        this.isLoading = false;
    },
    methods: {
        setPasswordInputCallback(callbackItem) {
            // Get the input component reference.
            this.passwordInput = callbackItem;
        },
        verifyNickname() {
            const validNicknameLength = 8;
            this.hasErrorNickname = !(
                this.nickname != "" &&
                this.nickname.length >= validNicknameLength
            );

            return !this.hasErrorNickname;
        },
        verifyInput() {
            let isValid = true;

            isValid &= this.verifyNickname();
            isValid &= this.passwordInput.verifyInput();

            return isValid;
        },
        async confirmRegister() {
            // Prevent user to click the button when the api is processing.
            if (this.isProcessing) {
                return;
            }

            // If verify input return false, then notify user to input required fields.
            if (!this.verifyInput()) {
                NotificationHelper.notifyError("Thông tin không hợp lệ");

                return;
            }

            // Turn on is processing flag while the api is handling the request.
            this.isProcessing = true;

            const result = await Auth3ApiHandler.confirmRegisterAsync(
                this.registrationToken,
                this.nickname,
                this.password
            );

            // Turn off the flag after handling the request.
            this.isProcessing = false;

            if (result.isSuccess) {
                NotificationHelper.notifySuccess("Đăng ký thành công");

                // Redirect to login page when success.
                this.$router.push("/auth/login");
                return;
            }

            NotificationHelper.notifyError("Có lỗi xảy ra khi đăng ký");
        },
        getRandomNickname() {
            const length = 8;
            const randomString =
                StringHelper.generateSecureRandomString(length);
            const randomNumber = NumberHelper.getSecureRandomNumber(1, 1000);

            this.nickname = `user_${randomString}_${randomNumber}`;
            this.hasErrorNickname = false;
        },
    },
    watch: {
        nickname() {
            this.verifyNickname();
        },
    },
};
</script>
