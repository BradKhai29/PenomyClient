<template>
    <q-btn :to="homeLink" flat no-caps no-wrap dense>
        <q-avatar>
            <img
                src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729522677/penomy_assets/penomy.png"
            />
        </q-avatar>
        <span class="q-pl-sm text-weight-bold text-subtitle1">Penomy</span>
    </q-btn>
</template>

<script>
export default {
    name: "TheLogoButton",
    computed: {
        homeLink() {
            return "/";
        },
    },
};
</script>
