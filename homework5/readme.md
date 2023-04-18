Starting with lecture 5, you will be working on a to-do app.

**It is important to note that next homeworks are building on top of each other. 
You can't skip any homeworks from now on. 
All basic functionality is mandatory**

Mockups: https://www.figma.com/file/zWxBciks6tnS4SMqcXgqaP/Untitled?node-id=0-1

## Basic requirements

### Implementation

Use either boilerplate from functional.js or components.js files.

You can update base classes as needed, but you must not use any frameworks or libraries, just plain JS.

### General layout

- App should have a header
- App should have a search field
- Next to the search field there should be a button to add a new task
- In the content section, there should be a list of all unfinished tasks
- Under the list of unfinished tasks, there should be a list of all finished tasks

### Scenario 1: Adding a new task

When the user clicks on the "Add task" button, a modal window should appear. 
The modal window should have the following fields:
- Title
- Input field for the task title
- Cancel button
- Add button

When the user clicks on the "Add" button, the modal window should close and the task should be added to the list of unfinished tasks.

When the user clicks on the "Cancel" button, the modal window should close. No changes should be made to the task list.

### Scenario 2: Marking a task as finished

When the user sees an unfinished task in the list, they should be able to mark it as finished by clicking on the checkbox next to the task title.

When the user clicks on the checkbox, the task should be moved to the list of finished tasks.

### Scenario 3: Deleting a task

When the user sees a task in the list, they should be able to delete it by clicking on the "Delete" button next to the task title.

When the user clicks on the "Delete" button, the task should be removed from the list.

### Scenario 4: Searching for a task

When the user types a search query into the search field, the list of unfinished tasks should be filtered by the search query.

Tasks are updated in real time as the user types the search query.


These are basic requirements and are worth 1 point. If they are not met, the homework will be rejected.

## UI improvements - 2 points

Make the app look like the mockups.

Please use only vanilla CSS. No CSS frameworks are allowed.

# Possible extensions

## Local storage - 2 points

Make app persistent.

Store the tasks in the local storage. When the user reloads the page, the tasks should be loaded from the local storage.

## Implement logic using both OOP and FP - 2 points

There are 2 examples on how to approach the app logic: functional and object-oriented.

If you implement logic using both approaches, you will get 2 points.

## Don't lose children's state on parent's rerender - 2 points

Current implementation of the class-based components lose state for their children.

I.e. if you have an input inside a list, and list rerenders, text in input will be lost. 

Make a solution that will preserve state of children components.

# How to complete the homework

1. Clone this to your local computer, checkout master branch
2. Checkout master branch in your repository for assignments. Create `HW5` folder there and copy all content of this repo to `HW5` folder. Commit your changes.
3. Checkout a new branch `HW5` in your repository, start doing the assignment. Later you will create a PR from `HW5` to master and this PR will contain only the code you have added to the assignment code.
4. Describe which extensions you have implemented in the PR description.