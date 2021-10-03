# Task two - Technical specification for a new todo app.

### Todos:

- A user can write a card representing a task to be done.
- A user can mark a card as `To be Started`, `In progress` or `Done` by dragging them to different columns.
- A user can filter by other Users on the team and select to view all todos for the whole team, their own or a group of individuals.

### Technical Requirements

- `Build a prototype` with Figma in collaboration with designers. Since the app is meant to be used within the team it should be efficient to ask for input from end users. Should be compatible with other in house applications and graphic profile.

- `Create React App` Since the scope of the app is relatively small, no custom webpack configuration should be neccessary, and therefore being locked to react-scripts won't be an issue and saves a lot of time setting up the initial project.

- `TypeScript` For easier development and scalability.

- `Formatting/linting`. Format all code with prettier and lint with an opinionated eslint config such as Airbnb in order to have consitent code style and avoid some bugs.

- `State management` Stick to using the built in useReducer and only add a library such as Redux if it gets to a point where it has a clear benefit since it adds a lot of unneccessary overhead for simple state mangement.

- `Testing` Reliable tests that covers all core parts of the application are expected. Jest in combination with React Testing Library enforces good testing practices for client side testing.Setup github actions running tests automatically upon pull requests and deployment.

- `Styling` - Styled Components to be used for CSS.

- `Backend` - A simple REST API using TypeScript, Node.js, Express and Postgres will do the trick here. Required to be able to synchronize todos between users.
