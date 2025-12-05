//--------------------------------
// CONFIG
//--------------------------------
const REQUIRED_PAGES = 3; 
const REQUIRED_TIME = 20 * 60; // 20 minutes in seconds

//--------------------------------
// LOAD HTML COMPONENT AUTO
//--------------------------------
fetch("components/feedback.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initFeedbackSystem();
  });

//--------------------------------
// MAIN LOGIC
//--------------------------------
function initFeedbackSystem() {

  let pagesVisited = Number(localStorage.getItem("pagesVisited") || 0);
  pagesVisited++;
  localStorage.setItem("pagesVisited", pagesVisited);

  let timeSpent = Number(localStorage.getItem("timeSpent") || 0);

  setInterval(() => {
    timeSpent++;
    localStorage.setItem("timeSpent", timeSpent);

    checkConditions();
  }, 1000);
}

//--------------------------------
// CONDITIONS
//--------------------------------
function checkConditions() {
  if (localStorage.getItem("feedbackDone") === "true") return;
  if (localStorage.getItem("popupClosed") === "true") return;

  if (
    Number(localStorage.getItem("pagesVisited")) >= REQUIRED_PAGES &&
    Number(localStorage.getItem("timeSpent")) >= REQUIRED_TIME
  ) {
    showPopup();
  }
}

//--------------------------------
// SHOW / HIDE POPUP
//--------------------------------
function showPopup() {
  document.getElementById("feedbackModal").style.display = "flex";
}

function closePopup() {
  document.getElementById("feedbackModal").style.display = "none";
  localStorage.setItem("popupClosed", "true");
  showBadge();
}

function remindLater() {
  document.getElementById("feedbackModal").style.display = "none";
  showBadge();
}

function showBadge() {
  document.getElementById("feedbackBadge").style.display = "block";
}

//--------------------------------
// FEEDBACK SUBMIT
//--------------------------------
function submitFeedback() {
  const text = document.getElementById("feedbackText").value.trim();

  if (text.length < 5) {
    alert("Please write proper feedback.");
    return;
  }

  console.log("User Feedback:", text);

  localStorage.setItem("feedbackDone", "true");

  document.getElementById("feedbackModal").style.display = "none";
  document.getElementById("feedbackBadge").style.display = "none";

  alert("Thank you for your feedback ❤️");
}
