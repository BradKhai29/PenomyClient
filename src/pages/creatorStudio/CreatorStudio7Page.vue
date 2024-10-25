<template>
    <section
        id="artwork-detail-section-wrapper"
        :style="artworkDetailCardStyle"
    >
        <section
            id="artwork-detail-section"
            class="q-py-lg row justify-center"
            style="background-color: rgba(0, 0, 0, 0.4)"
        >
            <div
                id="artwork-detail-breadcrumb"
                class="row items-center q-pa-sm shadow-1 bg-light border-radius-md"
            >
                <router-link to="/studio/artworks">
                    <q-btn
                        dense
                        flat
                        no-caps
                        unelevated
                        class="text-subtitle1 text-weight-bold text-dark"
                    >
                        Quản lý chung
                    </q-btn>
                </router-link>
                <span class="text-weight-bold">
                    <q-icon name="chevron_right" size="sm" />
                </span>
                <span class="text-subtitle1"> Tiêu đề </span>
            </div>
            <section
                id="artwork-detail-card"
                class="row q-mt-md q-pa-md shadow-1 bg-light border-radius-md"
            >
                <q-img
                    class="col-auto q-mr-md border-radius-md shadow-1"
                    src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1728123518/comics/1605215803461632/1605215803461632.jpg"
                    width="225px"
                    height="280px"
                />
                <div class="col-grow column q-py-xs">
                    <h5 class="q-my-none text-weight-bold q-mb-md">
                        5 Học viện Anh Hùng mùa 1
                    </h5>
                    <div id="artwork-metadata" class="row">
                        <div id="country-and-author" class="column col-grow">
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold">
                                    Quốc gia:
                                </span>
                                <span>{{ artworkDetail.origin }}</span>
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Tác giả: </span>
                                <span>{{ artworkDetail.authorName }}</span>
                            </div>
                        </div>
                        <div id="status-and-series" class="column col-grow">
                            <div
                                class="q-mb-xs text-subtitle1 row items-center"
                            >
                                <span class="text-weight-bold">
                                    Trạng thái:
                                </span>
                                <span class="q-mx-xs">
                                    {{
                                        artworkDetail.artworkStatus ??
                                        "Hoàn thành"
                                    }}
                                </span>
                                <q-icon
                                    name="check"
                                    size="10px"
                                    class="bg-primary text-dark border-md-invisible border-radius-rounded q-pa-xs"
                                />
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Series: </span>
                                <span>{{
                                    artworkDetail.series ?? "Không có"
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div id="artwork-categories" class="q-gutter-sm q-my-sm">
                        <q-btn
                            v-for="i in 5"
                            :key="i"
                            dense
                            no-caps
                            unelevated
                            class="bg-dark text-light text-subtitle1 border-radius-sm"
                        >
                            Category {{ i + 1 }}
                        </q-btn>
                    </div>
                    <div id="action-button-group" class="q-gutter-sm q-mt-auto">
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="edit" size="sm" />
                            <span class="q-ml-xs">Sửa thông tin</span>
                        </q-btn>
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="report" size="sm" />
                            <span class="q-ml-xs">Bị báo cáo 0 đơn</span>
                        </q-btn>
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="bar_chart" size="sm" />
                            <span class="q-ml-xs">Thống kê</span>
                        </q-btn>
                        <q-btn
                            class="bg-secondary-500 text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="delete" size="sm" />
                            <span class="q-ml-xs">Xóa</span>
                        </q-btn>
                    </div>
                </div>
            </section>
        </section>
    </section>

    <section id="artwork-chapters-section"></section>
</template>

<script>
import { CreatorStudio7ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";

export default {
    data() {
        return {
            artworkDetailCardStyle: {
                background:
                    "url(https://res.cloudinary.com/dsjsmbdpw/image/upload/v1728123518/comics/1605215803461632/1605215803461632.jpg) no-repeat",
                backgroundSize: "cover",
            },
            artworkDetail: {
                id: 1,
                title: "Học viện anh hùng",
                origin: "Nhật Bản",
                authorName: "Hello",
                artworkStatus: null,
                series: null,
            },
        };
    },
    beforeMount() {
        this.artworkDetail.id = this.$route.params.comicId;
    },
    async mounted() {
        const result = await CreatorStudio7ApiHandler.getComicDetailByIdAsync(
            this.artworkDetail.id
        );

        this.artworkDetail = result;
    },
};
</script>

<style scoped>
#artwork-detail-breadcrumb,
#artwork-detail-card {
    --max-width: 90%;

    max-width: var(--max-width);
    width: var(--max-width);
}
</style>
