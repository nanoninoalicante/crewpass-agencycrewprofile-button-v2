import { ref, computed, reactive } from "vue"
import { useGeneralComposable } from "./generalComposable";
const { remapData } = useGeneralComposable()
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

let inputData = reactive({
    data: {}
})

const loading = ref(false);

const sanitizedParams = computed(() => {
    const keys = {
        "cpUserId": 'id',
        "cpUserEmail": 'email',
        "cpFirstName": 'fname',
        "cpLastName": 'lname',
        "cpNationality": 'nationality',
        "cpDob": 'birthday',
        "cpGender": 'gender',
        "cpCountryCode": 'countrycode',
        "cpPhone": 'phoneno',
        "cpCity": 'city',
        "cpState": 'state',
        "cpCountry": 'country',
    }
    return remapData(keys, inputData.data);
})
const queryParams = computed(() => {
    const params = new URLSearchParams(sanitizedParams.value);
    return params.toString();
})
const popupUrl = computed(() => {
    return `https://verify-dev.crewpass.co.uk?${queryParams.value}`
})
const buttonClick = () => {
    window.open(popupUrl.value,
        "cpAgencyCrewLoginPopup",
        "status=1, height=800, width=500, toolbar=0,resizable=0");
}

export function useButtonsComposable() {
    return { buttonColor, buttonText, logo, popupUrl, buttonClick, setContent, queryParams, sanitizedParams, inputData, loading }
}