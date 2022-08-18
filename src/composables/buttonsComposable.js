import { ref } from "vue"
const buttonText = ref("Start with CrewPass")
const logo = "https://storage.googleapis.com/crewpass-production-loginbutton/cp-icon.png";
const buttonColor = ref("bg-[#2B3D4B]")
export function useButtonsComposable() {
    return { buttonColor, buttonText, logo }
}