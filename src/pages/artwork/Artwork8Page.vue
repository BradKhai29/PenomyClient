<template>
    <q-page> Search text: {{ searchText }} </q-page>
</template>

<script>
export default {
    name: "Artwork8Page",
    data: function () {
        return {
            searchText: null,
        };
    },
    beforeMount() {
        this.searchText = this.$route.query.searchText;

        console.log(this.searchText);
    },
};
</script>
