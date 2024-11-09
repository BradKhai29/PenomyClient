<template>
    <section
        id="creator-detail-bar"
        class="q-pa-md bg-light border-radius-md flex items-center justify-between"
    >
        <router-link class="text-decoration-none bg-light">
            <q-btn dense flat padding="none" no-caps class="flex items-center">
                <q-avatar class="q-mr-sm" size="48px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="text-left">
                    <div class="text-subtitle1 text-weight-bold text-dark">
                        Penomy Official
                    </div>
                    <div class="text-subtitle2 text-weight-bold text-dark-500">
                        1N người theo dõi
                    </div>
                </div>
            </q-btn>
        </router-link>
        <div>
            <router-link
                v-if="isCreator"
                :to="`/studio/comic/detail/${artworkId}`"
            >
                <q-btn
                    class="bg-dark text-primary text-subtitle1 text-weight-bold"
                    no-caps
                    rounded
                >
                    <q-icon name="edit" size="xs" />
                    <span class="q-ml-xs">Sửa thông tin truyện</span>
                </q-btn>
            </router-link>
            <q-btn
                v-else
                class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                no-caps
                rounded
            >
                <span class="q-ml-xs">Theo dõi</span>
            </q-btn>
        </div>
    </section>
</template>

<script>
export default {
    name: "CreatorDetailBar",
    props: {
        creatorId: {
            required: true,
        },
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            isCreator: true,
        };
    },
};
</script>
