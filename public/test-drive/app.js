"use strict";

const API_BASE = "https://leadkux-sandbox.work-robert-budai.workers.dev";

const cards = document.querySelectorAll(".scenario-card");
const selectedName = document.getElementById("selected-name");
const startButton = document.getElementById("start-button");

const demoPanel = document.querySelector(".demo-panel");
const workflowPreview = document.querySelector(".workflow-preview");
const driveScreen = document.getElementById("drive-screen");

const interactionPanel = document.getElementById("interaction-panel");
const interactionLabel = document.getElementById("interaction-label");
const interactionInput = document.getElementById("interaction-input");
const interactionButton = document.getElementById("interaction-button");
const interactionResult = document.getElementById("interaction-result");
const interactionIntent = document.getElementById("interaction-intent");
const interactionQuestion = document.getElementById("interaction-question");
const followupPanel = document.getElementById("followup-panel");
const prepareFollowupButton = document.getElementById("prepare-followup-button");
const followupMessageCard = document.getElementById("followup-message-card");
const followupMessage = document.getElementById("followup-message");
const followupResponseArea = document.getElementById("followup-response-area");
const followupResponse = document.getElementById("followup-response");
const sendResponseButton = document.getElementById("send-response-button");
const noResponseButton = document.getElementById("no-response-button");
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
let interactionMode = "lead";


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


async function submitLeadMessage(message) {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/lead-input`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner":
                    currentSession.owner_token
            },
            body: JSON.stringify({
                scenario: selectedScenario,
                message: message
            })
        }
    );
}


async function submitQualificationAnswer(answer) {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/answer`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner":
                    currentSession.owner_token
            },
            body: JSON.stringify({
                answer: answer
            })
        }
    );
}

async function prepareFollowUp() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/follow-up`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": currentSession.owner_token
            },
            body: JSON.stringify({})
        }
    );
}


async function sendLeadResponse(response) {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/lead-response`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": currentSession.owner_token
            },
            body: JSON.stringify({
                response: response
            })
        }
    );
}


async function sendNoResponse() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/lead-response`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": currentSession.owner_token
            },
            body: JSON.stringify({
                no_response: true
            })
        }
    );
}

async function prepareHumanHandoff() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/handoff`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": currentSession.owner_token
            },
            body: JSON.stringify({})
        }
    );
}


async function completeInteractiveWorkflow() {
    return apiRequest(
        `/sandbox/session/${currentSession.session_id}/complete`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Sandbox-Owner": currentSession.owner_token
            },
            body: JSON.stringify({})
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
        interactionPanel.classList.add("hidden");
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

    interactionPanel.classList.remove("hidden");
    interactionResult.classList.add("hidden");
    interactionInput.value = "";
    interactionMode = "lead";
    interactionLabel.textContent =
        "ENTER A SYNTHETIC LEAD MESSAGE";
    interactionButton.innerHTML =
        'PROCESS LEAD <span>&rarr;</span>';
    resetButton.classList.add("hidden");

    startButton.disabled = false;
    startButton.innerHTML =
        'START TEST DRIVE <span>&rarr;</span>';

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
            'TRY AGAIN <span>&rarr;</span>';

        alert(
            "The LeadKux Test Drive could not be started."
        );
    }
});


interactionButton.addEventListener("click", async () => {

    const value = interactionInput.value.trim();

    if (!value) {
        alert("Enter a synthetic lead message first.");
        return;
    }

    interactionButton.disabled = true;
    interactionButton.textContent = "PROCESSING...";

    try {
        let result;

        if (interactionMode === "lead") {
            result = await submitLeadMessage(value);
        } else {
            result = await submitQualificationAnswer(value);
        }

        interactionResult.classList.remove("hidden");
        interactionIntent.textContent =
            `Detected intent: ${result.intent}`;

        engineState.textContent = result.state;
        updateProgress(result.state);

        if (result.qualified) {
            stateKicker.textContent = "QUALIFIED";
            stateHeadline.textContent =
                "Lead qualification completed";

            stateExplanation.textContent =
                "LeadKux processed the visitor's input and collected the required qualification context.";

            stateOutcome.textContent =
                "Lead context ready for follow-up";

            interactionQuestion.textContent =
                "Qualification complete. The lead is ready for the next workflow stage.";

            interactionInput.classList.add("hidden");
            interactionButton.classList.add("hidden");

            followupPanel.classList.remove("hidden");
            prepareFollowupButton.classList.remove("hidden");
            followupMessageCard.classList.add("hidden");
            followupResponseArea.classList.add("hidden");

        } else {
            stateKicker.textContent = "QUALIFYING";
            stateHeadline.textContent =
                "LeadKux needs more information";

            stateExplanation.textContent =
                "The submitted lead was processed, but required qualification context is still missing.";

            stateOutcome.textContent =
                "Waiting for qualification response";

            interactionQuestion.textContent =
                result.qualification_question;

            interactionLabel.textContent =
                "REPLY TO LEADKUX";

            interactionInput.value = "";
            interactionInput.placeholder =
                result.qualification_question;

            interactionMode = "answer";

            interactionButton.innerHTML =
                'SUBMIT ANSWER <span>&rarr;</span>';
        }

    } catch (error) {
        console.error(error);

        alert(
            "LeadKux could not process this interaction."
        );

    } finally {
        interactionButton.disabled = false;

        if (!interactionButton.classList.contains("hidden")) {
            interactionButton.innerHTML =
                interactionMode === "lead"
                    ? 'PROCESS LEAD <span>&rarr;</span>'
                    : 'SUBMIT ANSWER <span>&rarr;</span>';
        }
    }
});

prepareFollowupButton.addEventListener("click", async () => {
    prepareFollowupButton.disabled = true;
    prepareFollowupButton.textContent = "PREPARING...";

    try {
        const result = await prepareFollowUp();

        engineState.textContent = result.state;
        updateProgress(result.state);

        stateKicker.textContent = "FOLLOW-UP";
        stateHeadline.textContent = "Follow-up prepared";
        stateExplanation.textContent =
            "LeadKux used the collected qualification context to prepare the next customer interaction.";
        stateOutcome.textContent =
            "Waiting for simulated lead response";

        followupMessage.textContent = result.message;

        prepareFollowupButton.classList.add("hidden");
        followupMessageCard.classList.remove("hidden");
        followupResponseArea.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        alert("LeadKux could not prepare the follow-up.");

        prepareFollowupButton.disabled = false;
        prepareFollowupButton.innerHTML =
            'PREPARE FOLLOW-UP <span>&rarr;</span>';
    }
});


sendResponseButton.addEventListener("click", async () => {
    const response = followupResponse.value.trim();

    if (!response) {
        alert("Enter a simulated lead response.");
        return;
    }

    sendResponseButton.disabled = true;

    try {
        const result = await sendLeadResponse(response);

        engineState.textContent = result.state;
        updateProgress(result.state);

        if (result.handoff_ready) {
            stateKicker.textContent = "HUMAN HANDOFF";
            stateHeadline.textContent =
                "Preparing human handoff";
            stateExplanation.textContent =
                "LeadKux is packaging the collected qualification context for human review.";
            stateOutcome.textContent =
                "No customer action is executed automatically";

            followupResponseArea.classList.add("hidden");

            const handoff = await prepareHumanHandoff();

            engineState.textContent = handoff.state;
            updateProgress(handoff.state);

            stateHeadline.textContent =
                "Lead ready for human review";
            stateExplanation.textContent = handoff.summary;
            stateOutcome.textContent =
                handoff.recommended_action;

            const completed =
                await completeInteractiveWorkflow();

            engineState.textContent = completed.state;
            updateProgress(completed.state);

            stateKicker.textContent = "RESULT";
            stateHeadline.textContent =
                "Interactive workflow completed";
            stateExplanation.textContent =
                "LeadKux completed the synthetic lead-recovery workflow and prepared the qualified context for human action.";
            stateOutcome.textContent =
                completed.outcome;

            interactionPanel.classList.add("hidden");
            followupPanel.classList.add("hidden");

            interactionInput.value = "";
            interactionResult.classList.add("hidden");
            interactionIntent.textContent = "";
            interactionQuestion.textContent = "";

            followupMessageCard.classList.add("hidden");
            followupResponseArea.classList.add("hidden");
            followupResponse.value = "";

            resetButton.classList.remove("hidden");
        } else {
            stateKicker.textContent = "FOLLOW-UP";
            stateHeadline.textContent =
                "Further follow-up required";
            stateExplanation.textContent = result.summary;
            stateOutcome.textContent = result.next_action;
        }

    } catch (error) {
        console.error(error);
        alert("LeadKux could not process the response.");

    } finally {
        sendResponseButton.disabled = false;
    }
});


noResponseButton.addEventListener("click", async () => {
    noResponseButton.disabled = true;

    try {
        const result = await sendNoResponse();

        engineState.textContent = result.state;
        updateProgress(result.state);

        stateKicker.textContent = "FOLLOW-UP";
        stateHeadline.textContent =
            "No response received";
        stateExplanation.textContent = result.summary;
        stateOutcome.textContent =
            "Follow-up remains required";

    } catch (error) {
        console.error(error);
        alert("LeadKux could not process the no-response path.");

    } finally {
        noResponseButton.disabled = false;
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

