"use strict";

const API_BASE = "https://leadkux-sandbox.work-robert-budai.workers.dev";

const cards = document.querySelectorAll(".scenario-card");
const selectedName = document.getElementById("selected-name");
const startButton = document.getElementById("start-button");

const demoPanel = document.querySelector(".demo-panel");
const workflowPreview = document.querySelector(".workflow-preview");
const driveScreen = document.getElementById("drive-screen");

const continueButton = document.getElementById("continue-button");
const resetButton = document.getElementById("reset-button");

const driveTitle = document.getElementById("drive-title");
const stateKicker = document.getElementById("state-kicker");
const stateHeadline = document.getElementById("state-headline");
const stateExplanation = document.getElementById("state-explanation");
const stateOutcome = document.getElementById("state-outcome");
const engineState = document.getElementById("engine-state");

const leadAvatar = document.getElementById("lead-avatar");
const leadName = document.getElementById("lead-name");
const leadBusiness = document.getElementById("lead-business");
const leadSource = document.getElementById("lead-source");
const leadInterest = document.getElementById("lead-interest");
const leadStatus = document.getElementById("lead-status");
const leadProblem = document.getElementById("lead-problem");

const progressItems = document.querySelectorAll(".progress-item");

const scenarioNames = {
    solar: "Solar",
    real_estate: "Real Estate",
    home_services: "Home Services"
};

const stateOrder = [
    "DEMO_LEAD_CREATED",
    "QUALIFICATION",
    "FOLLOW_UP",
    "HUMAN_HANDOFF",
    "RESULT"
];

let selectedScenario = "solar";
let currentSession = null;
let currentDemo = null;


cards.forEach((card) => {
    card.addEventListener("click", () => {

        if (startButton.disabled) {
            return;
        }

        cards.forEach((item) => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedScenario = card.dataset.scenario;
        selectedName.textContent = scenarioNames[selectedScenario];
    });
});


async function apiRequest(path, options = {}) {
    const response = await fetch(
        `${API_BASE}${path}`,
        options
    );

    if (!response.ok) {
        throw new Error(
            `Sandbox request failed (${response.status})`
        );
    }

    return response.json();
}


async function createSandboxSession() {
    return apiRequest(
        "/sandbox/session",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}


async function generateDemo(session) {
    return apiRequest(
        `/sandbox/session/${session.session_id}/demo`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": session.owner_token
            },
            body: JSON.stringify({
                scenario: selectedScenario
            })
        }
    );
}


async function advanceDemo() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/advance`,
        {
            method: "POST",
            headers: {
                "X-Sandbox-Owner":
                    currentSession.owner_token
            }
        }
    );
}


async function resetDemo() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/reset`,
        {
            method: "POST",
            headers: {
                "X-Sandbox-Owner":
                    currentSession.owner_token
            }
        }
    );
}


function updateProgress(state) {
    const currentIndex = stateOrder.indexOf(state);

    progressItems.forEach((item) => {
        const itemState = item.dataset.state;
        const itemIndex = stateOrder.indexOf(itemState);

        item.classList.remove("active", "complete");

        if (itemIndex < currentIndex) {
            item.classList.add("complete");
        }

        if (itemIndex === currentIndex) {
            item.classList.add("active");
        }
    });
}


function renderLead(demo) {
    leadName.textContent = demo.lead_first_name;
    leadBusiness.textContent = demo.business_name;
    leadSource.textContent = demo.source;
    leadInterest.textContent = demo.interest;
    leadStatus.textContent = demo.initial_status;
    leadProblem.textContent = demo.situation;

    leadAvatar.textContent =
        demo.lead_first_name.charAt(0).toUpperCase();
}


function renderInitialState(demo) {
    driveTitle.textContent = "Missed lead detected";
    stateKicker.textContent = "DETECTED";
    stateHeadline.textContent = "Missed lead detected";

    stateExplanation.textContent =
        `${demo.lead_first_name}'s enquiry is still unanswered. ` +
        "LeadKux has identified an opportunity requiring attention.";

    stateOutcome.textContent =
        "Recovery workflow ready";

    engineState.textContent =
        "DEMO_LEAD_CREATED";

    updateProgress("DEMO_LEAD_CREATED");
}


function renderEngineEvent(event) {
    driveTitle.textContent = event.headline;
    stateKicker.textContent = event.stage;
    stateHeadline.textContent = event.headline;
    stateExplanation.textContent = event.explanation;
    stateOutcome.textContent = event.outcome;
    engineState.textContent = event.state;

    updateProgress(event.state);

    if (event.state === "RESULT") {
        continueButton.classList.add("hidden");
        resetButton.classList.remove("hidden");
    }
}


function showDriveScreen() {
    demoPanel.classList.add("hidden");
    workflowPreview.classList.add("hidden");

    driveScreen.classList.remove("hidden");

    driveScreen.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function restoreSelectionScreen() {
    driveScreen.classList.add("hidden");

    demoPanel.classList.remove("hidden");
    workflowPreview.classList.remove("hidden");

    continueButton.classList.remove("hidden");
    resetButton.classList.add("hidden");

    startButton.disabled = false;
    startButton.innerHTML =
        'START TEST DRIVE <span>→</span>';

    selectedName.textContent =
        scenarioNames[selectedScenario];

    currentDemo = null;

    demoPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


startButton.addEventListener("click", async () => {

    if (startButton.disabled) {
        return;
    }

    startButton.disabled = true;
    startButton.textContent = "STARTING...";

    try {
        currentSession =
            await createSandboxSession();

        currentDemo =
            await generateDemo(currentSession);

        sessionStorage.setItem(
            "leadkuxSandboxSession",
            JSON.stringify(currentSession)
        );

        sessionStorage.setItem(
            "leadkuxSandboxDemo",
            JSON.stringify(currentDemo)
        );

        renderLead(currentDemo);
        renderInitialState(currentDemo);
        showDriveScreen();

    } catch (error) {
        console.error(error);

        startButton.disabled = false;
        startButton.innerHTML =
            'TRY AGAIN <span>→</span>';

        alert(
            "The LeadKux Test Drive could not be started."
        );
    }
});


continueButton.addEventListener("click", async () => {

    continueButton.disabled = true;
    continueButton.textContent = "PROCESSING...";

    try {
        const event = await advanceDemo();

        renderEngineEvent(event);

        if (event.state !== "RESULT") {
            continueButton.innerHTML =
                'CONTINUE <span>→</span>';
        }

    } catch (error) {
        console.error(error);

        alert(
            "The sandbox could not advance the workflow."
        );

        continueButton.innerHTML =
            'TRY AGAIN <span>→</span>';

    } finally {
        continueButton.disabled = false;
    }
});


resetButton.addEventListener("click", async () => {

    resetButton.disabled = true;
    resetButton.textContent = "RESETTING...";

    try {
        const newSession = await resetDemo();

        currentSession = newSession;

        sessionStorage.setItem(
            "leadkuxSandboxSession",
            JSON.stringify(currentSession)
        );

        sessionStorage.removeItem(
            "leadkuxSandboxDemo"
        );

        restoreSelectionScreen();

    } catch (error) {
        console.error(error);

        alert(
            "The sandbox could not reset the session."
        );

    } finally {
        resetButton.disabled = false;
        resetButton.textContent =
            "TRY ANOTHER SCENARIO";
    }
});

