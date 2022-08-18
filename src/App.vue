<script setup>
import { onMounted, reactive, ref } from "vue"
import { useEventListener } from '@vueuse/core'
import { useButtonsComposable } from "./composables/buttonsComposable";
import SpinnerIcon from "./components/SpinnerIcon.vue";
const { buttonColor, buttonText, logo, setContent } = useButtonsComposable();
let inputData = reactive({
    data: {}
})
const loading = ref(false);
const buttonClick = () => {
    window.open("https://www.apple.com/",
        "cpLoginPopup",
        "status=1, height=800, width=500, toolbar=0,resizable=0");
}
useEventListener(window, 'message', (event) => {
    console.log('event: ', event.origin)
})

onMounted(() => {
    const button = document.getElementById("cp-agency-crew-profile-button");
    for (let i in button.dataset) {
        inputData.data[i] = button.dataset[i];
    }

})
</script>

<template>
    <button id="primaryButton" @click="buttonClick"
        class="flex flex-row items-center py-1 pl-2 pr-3 w-80 rounded-xl text-white text-[17px] border-2 border-transparent hover:bg-opacity-80 focus:border-gray-400"
        :class="buttonColor">
        <img class="flex-none w-6 h-6 mr-3" :src="logo" />
        <div v-if="loading" class="flex-none">
            <SpinnerIcon class="w-5 h-5 fill-white animate-spin"></SpinnerIcon>
        </div>
        <div class="flex-auto">
            {{
                    buttonText
            }}
        </div>
    </button>
</template>
<style scoped>
@import "./index.css";

#primaryButton {
    font-weight: 500;
    letter-spacing: -0.5px;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}
</style>