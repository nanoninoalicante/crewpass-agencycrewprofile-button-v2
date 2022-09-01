import { ref, computed, reactive, watch, onMounted } from "vue";
import { useGeneralComposable } from "./generalComposable";
import { useStorage } from '@vueuse/core'

const { remapData } = useGeneralComposable();
const logo =
	"https://storage.googleapis.com/crewpass-production-loginbutton/cp-icon.png";
const buttonText = ref("Approve With CrewPass");
const crewUserData = useStorage(`cp-crew-user`, { status: "not-checked"})
const content = {
	buttonText: "Approve with CrewPass",
	pleaseWait: "Please wait...",
	statuses: {
		"not-checked": {
			buttonText: "Approve With CrewPass",
		},
		loading: {
			buttonText: "Please Wait..",
		},
		pending: {
			buttonText: "Pending",
		},
		approved: {
			buttonText: "Approved",
		},
		verified: {
			buttonText: "Approved",
		},
		declined: {
			buttonText: "Declined",
		},
		unchecked: {
			buttonText: "Unchecked",
		},
	},
};

const setContent = (status) => {
	crewUserData.value.status = status;
	buttonText.value = content.statuses[status || "not-checked"]?.buttonText;
};

let inputData = reactive({
	data: {},
});


const loading = ref(false);

const sanitizedParams = computed(() => {
	const keys = {
		cpPartner: "partner",
		cpUserId: "id",
		cpUserEmail: "email",
		cpFirstName: "fname",
		cpLastName: "lname",
		cpNationality: "nationality",
		cpDob: "birthday",
		cpGender: "gender",
		cpCountryCode: "countrycode",
		cpPhone: "phoneno",
		cpStreetAddress: "address",
		cpCity: "city",
		cpState: "state",
		cpCountry: "country",
	};
	let params = remapData(keys, inputData.data);
	if (!params.partner) {
		params.partner = "yotspot";
	}
	return params;
});
const queryParams = computed(() => {
	const params = new URLSearchParams(sanitizedParams.value);
	return params.toString();
});
const popupUrl = computed(() => {
	return `https://crewpass-testing-web.netlify.app/crew-messages?${queryParams.value}`;
});
const origin = window.location.origin;
const popupFullUrlObject = computed(() => {
	if (!popupUrl.value) return ""
	const url = new URL(popupUrl.value);
	url.searchParams.append("origin", origin);
	return url;
})
const popupFullUrl = computed(() => {
	if (!popupFullUrlObject.value) return ""
	return popupFullUrlObject.value?.toString();
})
const popupOrigin = computed(() => {
	if (!popupFullUrlObject.value || !popupFullUrlObject.value) return ""
	return popupFullUrlObject.value?.origin;
})
const buttonClick = () => {

	window.open(
		popupFullUrl.value,
		"cpAgencyCrewLoginPopup",
		"status=1, height=800, width=500, toolbar=0,resizable=0"
	);
};

watch(crewUserData, (newValue) => {
	console.log("crew user data updated: ", newValue)
	if (newValue.status) {
		setContent(newValue.status?.toLowerCase())
	}
})

const setButtonData = (dataset) => {
	for (let i in dataset) {
		inputData.data[i] = dataset[i];
	}

}


const setMessageResponse = (data) => {
	crewUserData.value = {};
	for (const item in data) {
		crewUserData.value[item] = data[item];
	}

}

export function useButtonsComposable() {
	return {
		buttonText,
		logo,
		popupUrl,
		buttonClick,
		setContent,
		queryParams,
		sanitizedParams,
		inputData,
		loading,
		popupOrigin,
		setMessageResponse,
		setButtonData,
		crewUserData
	};
}