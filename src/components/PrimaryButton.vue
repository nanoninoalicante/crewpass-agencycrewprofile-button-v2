<script setup>
import { ref, onMounted } from "vue"
import { useEventListener } from "@vueuse/core";
import { useButtonsComposable } from "../composables/buttonsComposable";
import SpinnerIcon from "./SpinnerIcon.vue";
const { buttonText, logo, buttonClick, loading, crewUserData, popupOrigin, setButtonData, setContent, setMessageResponse } = useButtonsComposable();
const messages = ref([]);

useEventListener(window, 'message', (message) => {
    console.log('message origin: ', message.origin)
    console.log('message: ', message.data)
    if (message.origin === popupOrigin.value) {
        console.log("message: ", message);
        messages.value.push(message.data);
        if (message.data?.status && message.data?.cpUniqueId) {
            console.log('setting message response: ', message.data)
            setMessageResponse(message.data);
        }
    }
})

onMounted(() => {
    const button = document.getElementById("cp-agency-crew-profile-button");
    setButtonData(button.dataset);
    console.log("crewUserData.value: ", crewUserData.value?.status)
    if (crewUserData.value && crewUserData.value?.status) {
        setContent(crewUserData.value?.status?.toLowerCase())
    }
})
</script>
<template>
    <button id="primaryButton" @click="buttonClick"
        class="inline-flex flex-row items-center py-1 pl-2 pr-3 w-80 rounded-xl text-white text-[17px] border-2 border-transparent hover:bg-gray-500 focus:border-gray-400"
        :class="crewUserData.status">
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
@import "../index.css";

#primaryButton {
    font-weight: 600;
    letter-spacing: -0.5px;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.pending {
    background-color: #F39200;
}

.not-checked {
    background-color: #2B3D4B;
}

.loading {
    background-color: #2B3D4B;
}

.approved {
    background-color: #3AAA35;
}

.verified {
    background-color: #3AAA35;
}

.declined {
    background-color: #E6332A;
}

.unchecked {
    background-color: #878787;
}
</style>