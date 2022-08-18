import { ref, computed, reactive } from "vue"
import { useGeneralComposable } from "./generalComposable";
const { remapData } = useGeneralComposable()
const buttonText = ref("Start with CrewPass")
const logo = "https://storage.googleapis.com/crewpass-production-loginbutton/cp-icon.png";
const crewStatus = ref("not-checked");
const content = {
    buttonText: "Approve with CrewPass",
    pleaseWait: "Please wait...",
    statuses: {
        "not-checked": {
            buttonText: "Approve With CrewPass"
        },
        loading: {
            buttonText: "Please Wait.."
        },
        pending: {
            buttonText: "Pending"
        },
        approved: {
            buttonText: "Approved"
        },
        verified: {
            buttonText: "Approved"
        },
        declined: {
            buttonText: "Declined"
        },
        unchecked: {
            buttonText: "Unchecked"
        },
    },
}

const setContent = (status) => {
    crewStatus.value = status;
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
    setContent("pending");
    window.open(popupUrl.value,
        "cpAgencyCrewLoginPopup",
        "status=1, height=800, width=500, toolbar=0,resizable=0");
}

export function useButtonsComposable() {
    return { crewStatus, buttonText, logo, popupUrl, buttonClick, setContent, queryParams, sanitizedParams, inputData, loading }
}