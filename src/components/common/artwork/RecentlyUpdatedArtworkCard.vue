<template>
    <q-card class="my-card bg-grey-2 q-ma-sm" bordered>
        <q-card-section horizontal>
            <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax2.jpg" height="180px" width="35%" bordered />
            <q-card-section class="card-content q-pa-sm">
                <div class="text-subtitle1 text-weight-medium">One Piece - Đảo hải tặc</div>
                <div class="text-subtitle3 text-weight-regular">
                    <q-icon name="account_circle" size="1.7rem" />
                    by John Doe
                </div>
                <div class="card-content-center">
                    <div class="row">
                        <div class="text-subtitle2 col-6">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            2 ngày trước
                        </div>
                    </div>
                </div>

                <div class="card-content-bottom">

                    <q-btn no-caps dense size=".8rem" padding=".1rem .3rem" color="primary">Xem ngay</q-btn>
                    <q-icon name="more_vert" class="cursor-pointer">
                        <q-menu label="123" icon="more_vert" dropdown-icon="null"><q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Photos</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Videos</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Articles</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-icon>
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>
<style scoped>
.my-card {
    width: 100%;
    min-width: 22rem;
    max-width: 25.5rem;
    /* height: 180px; */
}
.card-content{
    width: 100%;
    /* padding: 0; */
}
.card-content-bottom {
    bottom: 0;
    display: flex;
    justify-content: space-between;
}
.card-content-center{
    height: 44%;
}
</style>