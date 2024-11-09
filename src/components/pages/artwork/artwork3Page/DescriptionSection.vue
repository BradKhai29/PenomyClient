<template>
    <q-card>
        <div class="row">
            <div class="text-title">{{ title }}</div>
            <q-icon
                class="text-center q-py-sm q-px-sm rotate-135 rounded"
                name="link"
                :style="{
                    boxShadow: '0 0 5px 2px #F9FAFC',
                    borderRadius: '50%',
                    fontSize: '16px',
                }"
            ></q-icon>
        </div>
        <div class="description">
            <div class="row text-description">
                <div class="text-country col-6 q-pt-xs">
                    <strong>Quốc gia:</strong> {{ country }}
                </div>
                <div class="text-status col-6">
                    <strong>Trạng thái: </strong> {{ status }}
                    <q-icon
                        class="q-px-xs"
                        color="green"
                        name="check_circle"
                    ></q-icon>
                </div>
            </div>
            <div class="row text-description">
                <div class="text-subtitle col-6 q-pt-xs">
                    <strong>Tác giả: </strong> {{ author }}
                </div>
                <div class="text-series col-6">
                    <strong>Series: </strong>
                    <span v-if="hasSeries">{{ seriesName }}</span>
                    <span v-else>No Series</span>
                </div>
            </div>
            <div class="row q-py-xs">
                <q-badge
                    v-for="(button, index) in buttons"
                    :key="index"
                    unelevated
                    :style="{
                        backgroundColor: '#120E36', // Dark blue color
                        color: 'white', // Make text bold
                        fontSize: '16px', // Decrease font size
                        padding: '8px 8px',
                        marginRight: '8px', // Adjust padding for a smaller badge
                    }"
                    :label="button.label"
                    class="q-mr-sm justify-center"
                ></q-badge>
            </div>
            <div class="row absolute-bottom q-pb-md">
                <q-btn
                    class="col-2 action-btn"
                    unelevated
                    rounded
                    no-caps
                    :style="{
                        fontSize: '16px',
                        backgroundColor: '#120E36',
                        color: 'white',
                    }"
                >
                    <q-icon
                        name="arrow_right"
                        class="q-mr-xs"
                        :style="{
                            fontSize: '32px',
                        }"
                    />
                    Xem tiếp
                </q-btn>
                <q-btn
                    class="col-2 q-mr-sm action-btn"
                    unelevated
                    rounded
                    no-caps
                    :style="{
                        fontSize: '16px',
                        backgroundColor: '#120E36',
                        color: 'white',
                    }"
                >
                    Xem từ đầu
                </q-btn>
                <q-btn
                    class="col-2 q-mr-sm action-btn"
                    unelevated
                    rounded
                    no-caps
                    @click="toggleFavorite(artworkId)"
                    :style="{
                        fontSize: '16px',
                        backgroundColor: isFavorited ? '#120E36' : '#EEEEEE',
                        width: 'auto',
                    }"
                >
                    <q-icon
                        name="ion-heart"
                        class="q-mr-xs"
                        :style="{ color: isFavorited ? '#DC5834' : '#120E36' }"
                    />
                    <span
                        :style="{ color: isFavorited ? '#EEEEEE' : '#120E36' }"
                    >
                        {{ isFavorited ? "Đã yêu thích" : "Yêu thích" }}
                    </span>
                </q-btn>
                <q-btn
                    class="col-3 q-mr-sm action-btn"
                    unelevated
                    rounded
                    no-caps
                    :style="{
                        fontSize: '16px',
                        backgroundColor: '#EEEEEE',
                        color: '#120E36',
                    }"
                >
                    <q-icon name="ion-alert" class="q-mr-xs" />
                    Báo cáo vi phạm
                </q-btn>
            </div>
        </div>
    </q-card>
</template>

<script setup>
import { ref } from "vue";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { useAuthStore } from "src/stores/common/AuthStore";
import axios from "axios";
import { useFavoriteStore } from "src/stores/pages/artwork3/ArtworkMetadataStore";

// Define reactive properties using `ref`
import { defineProps } from "vue";

// Define props for dynamic data
const props = defineProps({
    title: String,
    author: String,
    country: String,
    status: String,
    seriesName: String,
    buttons: {
        type: Array,
    },
    hasSeries: Boolean,
    artworkId: Number,
    isUserFavorite: Boolean,
});
const authStore = useAuthStore();
const favoriteStore = useFavoriteStore();

const isFavorited = ref(props.isUserFavorite);
async function toggleFavorite() {
    try {
        const url = isFavorited.value
            ? `${BaseWebApiUrl}/g47/favorite/remove`
            : `${BaseWebApiUrl}/g46/favorite/add`;
        const response = await axios({
            url: url,
            method: HttpMethod.POST,
            data: { artworkId: props.artworkId },
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });
        if (response.data.httpCode !== 200) {
            return null;
        }
        const data = response.data.httpCode;
        const count = response.data.favoriteCount;
        if (data === 200) {
            isFavorited.value = !isFavorited.value;
            favoriteStore.setFavoriteCount(count);
        }
        console.log(isFavorited.value);
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}
</script>


<style scoped>
.action-btn {
    font-weight: bold;
    margin-right: 10px;
    padding: 8px 16px 8px 16px;
}

.description {
    padding-top: 4px;
    padding-bottom: 4px;
}

.text-title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 32px;
    font-weight: bold;
    margin-right: 16px;
}

.text-description {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}
</style>
