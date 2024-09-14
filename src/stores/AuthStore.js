import { defineStore } from "pinia";

const useAuthStore = defineStore("authStore", {
    state: () => ({
        counter: 0,
        accessToken: null,
        refreshToken: null,
    }),

    getters: {
        doubleCount(state) {
            return state.counter * 2;
        },
    },

    actions: {
        increment() {
            this.counter++;
        },
    },
});

export { useAuthStore };
