<script setup>
import { onMounted } from "vue"
import { useEventListener } from '@vueuse/core'
import { useButtonsComposable } from "./composables/buttonsComposable";
import SpinnerIcon from "./components/SpinnerIcon.vue";
const { buttonColor, buttonText, logo, buttonClick, inputData, queryParams, sanitizedParams } = useButtonsComposable();

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
    <!-- <pre>{{ sanitizedParams }}</pre>
    <pre>{{ queryParams }}</pre>
    <pre>{{ inputData.data }}</pre> -->
</template>
<style scoped>
@import "./index.css";

#primaryButton {
    font-weight: 500;
    letter-spacing: -0.5px;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}
</style>