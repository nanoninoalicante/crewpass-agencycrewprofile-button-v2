import { createApp } from "vue";
import App from "./App.vue";

let app = null;

const setApp = () => {
    if (!app) {
        app = createApp(App);
        app.mount("#cp-agency-crew-profile-button");
    }
}

if (document.getElementById("cp-agency-crew-profile-button")) {
    setApp();
} else {
    console.log("app not mounted: ", document.getElementById("cp-agency-crew-profile-button"));
    const targetNode = document;

    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver(observerCallback);
    let ids = [];
    const createDOMMap = (element) => {
        if (element.id) ids.push(element.id);
        for (let i = 0; i < element.childNodes.length; i++) {
            createDOMMap(element.childNodes[i]);
        }
    };
    const observerCallback = (mutationList, observer) => {
        mutationList.map(function (mutation) {
            createDOMMap(mutation.target);
            if (ids.some((i) => i === "cp-agency-crew-profile-button")) {
                observer.disconnect();
                console.log("loaded");
                setApp();
                return mutation;
            }
        });
    }
    observer.observe(targetNode, config);

}
