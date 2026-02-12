let expenseList = JSON.parse(localStorage.getItem("expenses")) || [];

let navButtons = document.querySelectorAll(".nav-btn");
let pages = document.querySelectorAll(".page");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach((page) => page.classList.remove("active-page"));

    let target = btn.getAttribute("data-target");
    document.getElementById(target).classList.add("active-page");
  });
});

let expenseForm = document.getElementById("expense-form");
let expenseNameInput = document.getElementById("expense-name");
let expenseAmountInput = document.getElementById("expense-amount");
let expenseCategoryInput = document.getElementById("expense-category");

let expenseListContainer = document.getElementById("expense-list");
let totalExpenseEl = document.getElementById("total-expense");
let luxuryTotalEl = document.getElementById("luxury-total");
let expenseCountEl = document.getElementById("expense-count");
let categoryGraphEl = document.getElementById("category-graph");
let insightTextEl = document.getElementById("insight-text");

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = expenseNameInput.value.trim();
  let amount = Number(expenseAmountInput.value);
  let category = expenseCategoryInput.value;

  if (!name || amount <= 0 || category === "Select") {
    alert("Please enter valid expense details.");
    return;
  }

  expenseList.push({
    name,
    amount,
    category,
    date: new Date(),
  });

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  expenseCategoryInput.value = "Select";

  updateApp();
});

function updateApp() {
  renderHistory();
  updateSummary();
  renderCategoryGraph();
  updateInsight();
  localStorage.setItem("expenses", JSON.stringify(expenseList));
}

function renderHistory() {
  expenseListContainer.innerHTML = "";

  if (expenseList.length === 0) {
    expenseListContainer.innerHTML = "<p>No expenses added yet.</p>";
    return;
  }

  expenseList.forEach((expense, index) => {
    let row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.padding = "0.6rem 0";

    row.innerHTML = `
      <div>
        <strong>${expense.name}</strong><br>
        <small>${expense.category}</small>
      </div>
      <div>
        ₹${expense.amount}
        <button onclick="deleteExpense(${index})" style="margin-left:10px;background:#EF4444;color:white;border:none;padding:4px 8px;border-radius:6px;cursor:pointer;">Delete</button>
      </div>
    `;

    expenseListContainer.appendChild(row);
  });
}

function deleteExpense(index) {
  expenseList.splice(index, 1);
  updateApp();
}

function updateSummary() {
  let total = expenseList.reduce((sum, e) => sum + e.amount, 0);

  let luxuryTotal = expenseList
    .filter((e) => e.category === "Luxury")
    .reduce((sum, e) => sum + e.amount, 0);

  totalExpenseEl.textContent = `₹${total}`;
  luxuryTotalEl.textContent = `₹${luxuryTotal}`;
  expenseCountEl.textContent = expenseList.length;
}

function renderCategoryGraph() {
  categoryGraphEl.innerHTML = "";

  if (expenseList.length === 0) {
    categoryGraphEl.innerHTML = "<p>No expenses recorded yet.</p>";
    return;
  }

  let categoryTotals = {};

  expenseList.forEach((exp) => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  let maxValue = Math.max(...Object.values(categoryTotals));

  for (let category in categoryTotals) {
    let wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";

    let label = document.createElement("span");
    label.textContent = `${category} – ₹${categoryTotals[category]}`;

    let bar = document.createElement("div");
    bar.style.height = "10px";
    bar.style.backgroundColor = "#10B981";
    bar.style.borderRadius = "6px";
    bar.style.width = (categoryTotals[category] / maxValue) * 100 + "%";

    wrapper.appendChild(label);
    wrapper.appendChild(bar);

    categoryGraphEl.appendChild(wrapper);
  }
}

function updateInsight() {
  if (expenseList.length === 0) {
    insightTextEl.textContent =
      "Add your first expense to unlock spending insights.";
    return;
  }

  let total = expenseList.reduce((sum, e) => sum + e.amount, 0);

  let categoryTotals = {};

  expenseList.forEach((exp) => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  let highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b,
  );

  let highestValue = categoryTotals[highestCategory];

  if (highestValue / total > 0.5) {
    insightTextEl.textContent = `${highestCategory} accounts for the largest share of your expenses. Reviewing it could help optimize your budget.`;
  } else if (total > 10000) {
    insightTextEl.textContent =
      "Your total spending is relatively high this month. Consider tracking it more closely.";
  } else {
    insightTextEl.textContent = "Your spending pattern appears well balanced.";
  }
}
let toggleBtn = document.getElementById("toggle-sidebar");
let sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
updateApp();
