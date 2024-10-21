<template>
    <div class="text-center">
        <router-link to="/">
            <q-btn flat no-caps no-wrap dense>
                <q-avatar>
                    <img src="/src/assets/logo/penomy.png" />
                </q-avatar>
                <span class="q-pl-sm text-weight-bold text-h5 text-dark">
                    <span class="underline-primary">Penom</span>
                    <span>y</span>
                </span>
            </q-btn>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "PenomyAvatar",
};
</script>
