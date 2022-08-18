<script setup>
import { onMounted, ref } from "vue"
import { useButtonsComposable } from "./composables/buttonsComposable";
const { buttonColor, buttonText, logo } = useButtonsComposable();
onMounted(() => {
    const button = document.getElementById("button");
    console.log(button.dataset["cpUserEmail"])
})
</script>

<template>
    <button id="primaryButton"
        class="flex flex-row items-center py-1 pl-2 pr-3 w-80 rounded-xl text-white text-[17px] border-2 border-transparent hover:bg-opacity-80 focus:border-gray-400"
        :class="buttonColor">
        <img class="flex-none w-6 h-6 mr-3" :src="logo" />
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