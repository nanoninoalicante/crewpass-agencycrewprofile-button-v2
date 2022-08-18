import { ref } from "vue"
const buttonText = ref("Start with CrewPass")
const logo = "https://storage.googleapis.com/crewpass-production-loginbutton/cp-icon.png";
const buttonColor = ref("bg-[#2B3D4B]")

const content = {
    buttonText: "Approve with CrewPass",
    pleaseWait: "Please wait...",
    statuses: {
        "not-checked": {
            buttonText: "Approve With CrewPass",
            backgroundColor: "#2B3D4B"
        },
        loading: {
            buttonText: "Please Wait..",
            backgroundColor: "#2B3D4B"
        },
        pending: {
            buttonText: "Pending",
            backgroundColor: "#F39200"
        },
        approved: {
            buttonText: "Approved",
            backgroundColor: "#3AAA35"
        },
        verified: {
            buttonText: "Approved",
            backgroundColor: "#3AAA35"
        },
        declined: {
            buttonText: "Declined",
            backgroundColor: "#E6332A"
        },
        unchecked: {
            buttonText: "Unchecked",
            backgroundColor: "#878787"
        },
    },
}

const setContent = (status) => {
    buttonColor.value = content.statuses[status || "not-checked"]?.backgroundColor;
    buttonText.value = content.statuses[status || "not-checked"]?.buttonText;
}

export function useButtonsComposable() {
    return { buttonColor, buttonText, logo, setContent }
}