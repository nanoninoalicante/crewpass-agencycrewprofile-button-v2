import { createApp } from "vue";
import App from "./App.vue";

let app = null;

console.log("app not mounted: ", document.getElementById("cp-agency-crew-profile-button"));
const targetNode = document;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);
let ids = [];
const createDOMMap = function (element) {
    let nodes = [];
    console.log("id: ", element.id)
    if (element.id) ids.push(element.id);
    for (let i = 0; i < element.childNodes.length; i++) {
        let details = {
            id: element.childNodes[i].id,
        };
        details.children = createDOMMap(element.childNodes[i]);
        nodes.push(details);
        continue;
    }
    return nodes;
};
// Callback function to execute when mutations are observed
function observerCallback(mutationList, observer) {
    mutationList.map(function (mutation) {
        createDOMMap(mutation.target);
        console.log(
            "ids: ",
            ids.some((i) => i === "cp-agency-crew-profile-button")
        );
        if (ids.some((i) => i === "cp-agency-crew-profile-button")) {
            observer.disconnect();
            console.log("loaded")
            if (!app) {
                app = createApp(App);
                app.mount("#cp-agency-crew-profile-button");
            }
            return mutation;
        }
    });
}

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

