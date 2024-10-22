<template>
    <div>
        <EmojiPicker :native="true" :pickerType="'native'" :disable-sticky-group-names="true" :disableSkinTones="true"
            @select="onSelectEmoji" />
    </div>
</template>

<script>
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    components: {
        EmojiPicker,
    },
    methods: {
        onSelectEmoji(e) {
            this.$emit("onIconSelected", e.i);
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>