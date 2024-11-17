<template>
    <q-page>
        <SocialGroupDescription :group-id="$route.params.id"/>
    </q-page>

</template>
<script setup>
import SocialGroupDescription from 'src/components/common/socialMedia/SocialGroupDescription.vue';

</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}
</style>