<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-item>
            <q-avatar size="10rem">
                <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <q-item-section horizontal>
                <q-card-section>
                    {{ lorem }}
                </q-card-section>
            </q-item-section>
        </q-item>

        <q-separator />
    </div>
</template>

<script>
export default {
    setup() {
        return {
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 350px
  </style>