<template>
    <q-card class="my-card bg-grey-2" bordered>
        <q-card-section horizontal>
            <!-- left content -->
            <q-img class="col-5 image" fit="cover" src="https://cdn.quasar.dev/img/parallax2.jpg" height="180px"
                width="37%" bordered>
                <div class="rating">
                    <q-icon name="star" size="1rem"></q-icon>
                    <span class="text-subtitle2">4.8</span>
                </div>
                <div class="card-left-bottom absolute-bottom-right">
                    <div class="favorite">
                        <q-icon name="favorite" size=".84rem"></q-icon>
                        <span class="text-subtitle2">100K</span>
                    </div>
                    <q-avatar rounded id="flag">
                        <img
                            src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0">
                    </q-avatar>
                </div>

            </q-img>

            <!-- right content -->
            <q-card-section class="card-content q-pa-sm">
                <div class="text-subtitle1 text-weight-medium" style="padding-left: .2rem;">One Piece - Đảo hải tặc
                </div>
                <div class="text-subtitle3 text-weight-regular">
                    <q-icon name="account_circle" size="1.7rem" />
                    by John Doe
                </div>
                <div class="card-content-center q-pa-sm">
                    <div class="row">
                        <div class="text-subtitle2 col-6">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            2 ngày trước
                        </div>
                    </div>
                </div>

                <div class="card-content-bottom q-pa-xs">
                    <q-btn no-caps dense padding=".15rem .3rem" color="primary" class="text-subtitle2">Xem ngay</q-btn>
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
}

.card-content {
    width: 100%;
}

.card-content-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-content-center {
    height: 47%;
}

.rating,
.favorite {
    background-color: green;
    border-bottom-right-radius: 6px;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .15rem .4rem;
}

.favorite {
    border-radius: 5px;
    height: 1.5rem;
}

.card-left-bottom {
    background-color: transparent;
    height: 51px;
    width: 7.6rem;
    display: flex;
    gap: .2rem;
    justify-content: space-between;
}

#flag {
    height: 1.6rem;
    width: 2.3rem;
}
</style>