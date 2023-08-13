# John Task List
## Project Overview and Purpose

This solution was developed to solve Buzzvel's 2023 Dev Team Test, consisting of a task management application (to-do list).

John Task List is a task management application designed for John, a busy professional who struggles to stay organized. It is purposefully user-friendly and visually appealing, allowing him to create, track, and remove tasks.

## Installation
[comment]: <> (Provide detailed step-by-step instructions on how to install and set up the application. Since you're distributing it using Docker, outline the necessary Docker commands and dependencies)

To get started with this project, follow these steps to set up the required dependencies and start the development server:

### Install Dependencies
Open your terminal and navigate to the project directory. Run the following command to isntall the required dependencies:

```console
npm install
```
This will fetch and install all the necessary packages specified in the `package.json` file.

### Database Migration: 
This application uses Prisma for database management. Run the following command after updating the .env files to apply the database schema migrations.

```console
npx prisma migrate dev
```
This command will create the required tables and structures within the SQLite database. 

### Start Development Server
Once the dependencies are installed and the database schema is migrated, start the development server with the following command:

```console
npx prisma migrate dev
```
This command will launch the development server, making your application accessible for testing and development.

By following these steps, you'll have the application's environment set up, the database schema migrated, and the development server running. You can then access the application in your web browser and begin working on your project.
## Usage
[comment]: <> (Explain how to use the application, including any environment variables, configuration files, or command-line options that might be relevant. Provide examples and screenshots to illustrate the usage.)

While this application was developed to be responsive, it was designed mobile-first and is highly encouraged to be used in mobile devices.

### Tasks

This is the main page of the application were two task lists will be displayed, one with pending tasks and one with completed tasks. 

Initially, there will be no tasks, to include them, click on the "+" floating button on the bottom of the screen.

Once the tasks are displayed, you can click on the checkbox to mark a task as complete, or on the trash button to remove them.

### Sorting tasks

You can switch on the sorting by clicking on the arrows on the header of the task list, please consider that once activated, for now, to deactivated it you'll need to reload the page. 
### The toggle complete behavior

- Marking a task complete won't change the subtasks completion status, as that was considered a business rule that was not explicit in the dev-test description.

#### The remove behavior

- Be warned that clicking on the remove button will remove it immediattely, there's no confirmation yet.

- Removing a task will remove all its subtasks complete, or not.


### Editing a task
To edit a task, **press and hold** on the task description until the manage form is displayed.

### Viewing subtasks
Pressing the task description once will take you to the subtasks page, were the selected task subtasks will be displayed and where you'll find the same behavior you experienced on the tasks page, except that pressing a subtask title once will do nothing.

## Architecture
[comment]: <> (Describe the overall architecture of your application. For a full-stack application, explain the front-end and back-end components and how they interact with each other.)

The architecture of this project has been crafted to deliver a robust and efficient solution, catering to both the needs of the front-end application and the underlying backend services. It emplyes a Backend for Frontend (BFF) approach, optimizing the interaction between the front-end and the back-end. Additionally, the project follows the Model-View-Controller (MVC) pattern and incorporates SOLID principles to enhance code organization and maintainability.

## Technologies Used
[comments]: <> (List all the technologies and frameworks used in the project, such as programming languages, databases, front-end libraries, and any other essential tools.)
- Next 13
- React
- TailwindCSS
- TypeScript
- Prisma
- React Hook Form
- ReactQuery
- Zod
- Axios
- ESLint
- Lucide Icons
- Vitest

## API Documentation
[comments]: <> (If your application includes an API, provide detailed documentation on the available endpoints, request formats, and responses.)
## Database Setup
[comments]: <> (If your application uses a database, explain how to set it up and provide any necessary seed data.)

This application employs a simple SQLite database to manage data persistence. To set up the database for your development environment, follow these steps:

### Database Installation
SQLite is included in most operating systems by default. If you don't have it installed, you can download it from the [official website](https://www.sqlite.org/download.html).

### Create a Database
Once SQLite is installed, navigate to your project directory in the terminal and execute the following command to create a new SQLite database file:

```console
touch dev.db
```

### Configure the Database Path
In order to connect to the newly created database, you need to specify its path in the '.enc' file. Open the '.env' file located in your project root and add the following line replacing '<path_to_your_project>' with the actual path to your project:

```env
DATABASE_URL=file:<path_to_your_project>/dev.db
```

### Migrate Database Schema
This application uses Prisma for database management. Run the following command to apply the database schema migrations:
```bash
npx prisma migrate dev

```
This application will now be running and connected to your SQLite database.

Remember that this setup is tailored for local development purposes. If you decide to deploy the application, you might need to adjust the dataase configuration accordingly to ensure proper connectivity.

By following these steps, you'll have your SQLite database up and running, ready to store and manage your application's data
## Testing
[comments]: <> (If you've included unit tests or integration tests, explain how to run them and what they cover.)
The quality and reliability of this project is taken seriously, and thorough testing is an integral part of the development process. The testing strategy includes both unit tests for individual components and broader integration tests to ensure the project functions as intended across various scenarios.

### Unit Tests

At this moment, all efforts were focused on creating unit tests for the back-end use-cases. These unit tests evaluate specific functionalities in isolation to ensure they perform as expected. By validating individual units of code, we aim to catch and rectify issues early in the development cycle.

### Running Tests

To execute the unit tests, you can use the following script:

```console
npm run test
```

Running this command will trigger the test suite, allowing you to observe the outcomes and any potential errors. The script will provide feedback on the success or failure of each test, helping you gauge the overall health of the project's codebase.

We are commited to expanding our testing coverage to encompass a wider range of scenarios as the project evolves. This approach will enhance the stability and robustness of the application, ensuring a high-quality user experience.
## Deployment
[comments]: <> (Offer guidance on how to deploy the application in a production environment. Include any necessary configurations or considerations.)
## Troubleshooting
[comments]: <> (Create a troubleshooting section that addresses common issues and their solutions. Include a way for users to get help or report bugs.)
## Contributing
[comments]: <> (If you intend to allow others to contribute to your project, outline the contribution guidelines and instructions for submitting pull requests.)
As of August 2023, this project does not support public contribution.
## License
[![License](https://img.shields.io/static/v1?label=license&message=GPL-3&color=49AA26&labelColor=000000)](https://opensource.org/license/gpl-3-0/)

## Acknowledgements
[comments]: <> (If your project uses third-party libraries, frameworks, or resources, give credit to the respective authors and provide links to their repositories or websites.)
The Application layout was inspired by [Todo List Mobile App](https://dribbble.com/shots/4411419/attachments/4411419-Todo-List-Mobile-App?mode=media) from Jenelle Miller.

Special thanks to [Guilherme Vieira](https://github.com/guiprav) for the help with the glassmorphic cards styling and structure.

## Contact Information
[comments]: <> (Include your contact information or a link to your portfolio or personal website so that potential employers or collaborators can reach out to you.)
- [LinkedIn](https://www.linkedin.com/in/marcusdavanco/)
- [Email](mailto:marcusdavanco@gmail.com)
- [Blog](https://marcusdavanco.github.io)

