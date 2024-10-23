<template>
    <div class="row">
        <Picker :data="emojiIndex" set="facebook" @select="onSelectEmoji" :showPreview="false" />
    </div>

    <div class="row">
        <div>
            {{ emojisOutput }}
        </div>
    </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

let emojiIndex = new EmojiIndex(data);

export default {
    name: "App",
    components: {
        Picker
    },

    data() {
        return {
            emojiIndex: emojiIndex,
            emojisOutput: ""
        };
    },

    methods: {
        showEmoji(emoji) {
            this.emojisOutput = this.emojisOutput + emoji.native;
            console.log(emoji);
        },
        onSelectEmoji(e) {
            this.$emit("onIconSelected", e.native);
        }
    }
};
</script>

<style>

</style>