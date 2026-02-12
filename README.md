SpendWise – Smart Expense Dashboard


Short Description

SpendWise is a web-based expense tracking application built using HTML, CSS, and Vanilla JavaScript.
It allows users to record daily expenses, view category-wise distribution, and receive simple spending insights in real time.

The goal of this project was to move beyond static pages and build a structured, data-driven interface using core JavaScript concepts without relying on frameworks.


Features

* Add expense with input validation
* Delete individual expenses
* Data persistence using LocalStorage
* Dynamic category breakdown graph (horizontal bars)
* Automated spending insight logic
* Sidebar navigation with single-page behavior
* Financial summary view (total spent, luxury spending, expense count)
* Responsive and structured layout


Tech Stack

* HTML5
* CSS3 (Flexbox + Grid)
* Vanilla JavaScript
* Browser LocalStorage API


Data Flow & Architecture

The application uses a centralized `expenseList` array as the single source of truth.

Every expense is stored as an object containing name, amount, and category. Whenever a change occurs such as adding or deleting an expense, the state is updated first. After that, a single `updateApp()` function re-renders all dependent UI sections including:

* Expense history
* Category breakdown graph
* Summary calculations
* Spending insights

This ensures the interface always reflects the current state of the data and keeps the logic predictable and maintainable.

No frameworks or external libraries were used. All UI updates are handled through manual DOM manipulation and array methods like `reduce`, `filter`, and `forEach`.


Learning Outcomes

* Improved understanding of state-driven UI updates
* Strengthened DOM manipulation skills
* Applied array methods like `reduce`, `filter`, and `forEach` in real use cases
* Implemented dynamic rendering without page reload
* Learned to use LocalStorage for client-side data persistence
* Practiced structuring JavaScript logic in a clean and scalable way

SpendWise was built to focus on fundamentals. The project emphasizes clarity, structure, and practical implementation of core JavaScript concepts in a real-world scenario.
