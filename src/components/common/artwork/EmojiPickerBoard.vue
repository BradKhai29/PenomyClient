<template>
    <div class="row">
        <Picker :data="emojiIndex" set="facebook" @select="onSelectEmoji" :showPreview="false" />
    </div>
</template>

<script setup>
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import { defineComponent, defineEmits } from "vue";
let emojiIndex = new EmojiIndex(data);
defineComponent({ Picker, EmojiIndex });
const emit = defineEmits(["onIconSelected"]);
function onSelectEmoji(e) {
    emit("onIconSelected", e.native);
}
</script>