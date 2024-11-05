<template>
    <section
        id="creator-detail-bar"
        class="q-pa-md bg-light border-radius-md flex items-center justify-between"
    >
        <div class="flex items-center">
            <div class="q-mr-xs">
                <q-icon name="account_circle" size="48px" />
            </div>
            <div class="text-dark">
                <div class="text-subtitle1 text-weight-bold">
                    Penomy Official
                </div>
                <div>1N người theo dõi</div>
            </div>
        </div>
        <div>
            <q-btn
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
};
</script>
