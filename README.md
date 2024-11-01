Todo List Project
This application is a Todo List management tool built with React, TypeScript, and Material-UI, featuring robust task management options. Below is a comprehensive list of functionalities available in this project.

Features and Functionalities

1. Task Creation
   Add New Task: Click the "+" button to open a form where users can create a new task with details such as:
   Title: A descriptive name for the task.
   Priority: Choose between LOW, MEDIUM, and HIGH.
   Date and Time: Set the deadline or time for the task.
   Estimate: Enter the estimated time to complete the task in hours.
   Automatic ID and Hash Generation: Each new task automatically receives a unique ID and a 5-character hash for security purposes.
2. Task Display
   Table View: All tasks are displayed in a table, showing key details like Title, Priority, Date, Estimate, and Status.
   Real-Time Clock: The current date and time are displayed at the top right corner and update every second.
   Chart Summary: The application displays a pie chart summarizing tasks based on their Status (e.g., TODO, DOING, DONE, etc.).
3. Task Status Management
   Click-to-Change Status: Clicking on a task row opens a dialog where users can change the task’s status.
   Status Options: Tasks can be set to any of the following statuses: TODO, DOING, DONE, WARNING, PENDING, or FAILED.
4. Editing and Deleting Tasks
   Edit Task: Click the edit icon in the task row to open a form pre-filled with the task’s details, allowing users to update the title, priority, estimate, or status.
   Delete Task: Click the delete icon to open a confirmation popup. Upon confirming, users must also enter the task’s unique hash key for additional verification before the task is deleted.
5. Search and Filter Options
   Search by Title: A search bar allows users to filter tasks by their title.
   Filter by Priority: Users can filter tasks based on their priority level (LOW, MEDIUM, HIGH).
   Filter by Status: Allows filtering tasks based on their status.
   Filter by Estimate: Filter tasks based on the estimated hours for completion.
   Clear Search: An icon button next to the search bar lets users quickly reset the search term to view all tasks.
6. Sorting and Display Format
   Priority-Based Sorting: Tasks are sorted by priority (HIGH, MEDIUM, LOW) for quick access to important tasks.
   Estimate Display: The estimate is displayed in the most readable format, automatically converting to days, weeks, or months if applicable (e.g., 1h, 1d, 1w, etc.).
7. Data Persistence
   Local Storage: All tasks are stored in the browser’s local storage, ensuring that data is preserved even if the page is refreshed or the browser is closed.
