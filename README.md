# EmployWise - React User Management Application
### Overview
- EmployWise is a React-based user management application that integrates with the Reqres API. This project allows users to authenticate, view a paginated list of users, edit user details, and delete users. The application is deployed using Firebase.
- I have already created a blog website using a local JSON server as a database. For fetching, deleting, and creating data, I use API endpoints. This project has been very helpful in implementing the EmployWise application.
- [Live Link](https://employwise-f29b5.web.app/)
### Features
- Authentication: Login using provided credentials and store authentication token.
- User Management: View paginated user list, Search and filter users, Edit user details, Delete users.
- Error Handling: Displays appropriate error messages for failed API requests.
- Routing & Navigation: Utilizes React Router for seamless navigation between pages.
- UI/UX: Built using Bootstrap for a responsive and user-friendly interface.
- 404 Not Found Page: Handles navigation errors effectively.
### Technologies Used
- React.js (Frontend framework)
- Bootstrap (CSS framework)
- Fetch API (For API requests)
- React Router (For navigation)
- Local Storage (For token persistence)
### API Endpoints
### Authentication
- Login: POST https://reqres.in/api/login
- Request Body: { "email": "eve.holt@reqres.in", "password": "cityslicka" }
- Response: { "token": "QpwL5tke4Pnpja7X4" }
### User Management
- Get Users: GET https://reqres.in/api/users?page=1
- Update User: PUT https://reqres.in/api/users/{id}
- Delete User: DELETE https://reqres.in/api/users/{id}
### Error Handling
- Displays error messages for failed API responses.
- Includes a Not Found page for incorrect routes.
### Deployment
To deploy the application using Firebase
1. Build the project
```java
npm run build
```
2. Install Firebase CLI:
```java
npm install -g firebase-tools
```
3. Login to Firebase:
```java
firebase login
```
4. Initialize Firebase
```java
firebase init
```
5. Deploy the project
```java
firebase deploy
```
### Additional Information
- I already created a blog website using local json server as a database.
- For fetching, deleting, and creating data, I use API endpoints.
- This project has been very helpful in implementing these concepts.
### Future Enhancements
- Implement Redux for state management.
- Improve UI/UX with material UI for complex structure.
- Add user-role based authentication.
### Author Durga Devi S
