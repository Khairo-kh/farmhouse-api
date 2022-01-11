# Farmhouse API

## API DOCUMENTATION

# Users

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

1. [Delere Me](#1-delere-me)
1. [Delete User (ADMIN)](#2-delete-user-admin)
1. [Forgot Password](#3-forgot-password)
1. [Get All Users (ADMIN)](#4-get-all-users-admin)
1. [Get Me](#5-get-me)
1. [Login](#6-login)
1. [Reset Password](#7-reset-password)
1. [Signup](#8-signup)
1. [Update Me](#9-update-me)
1. [Update Password](#10-update-password)
1. [Update User (ADMIN)](#11-update-user-admin)

---

### 1. Delete Me

Deletes currently logged-in user. (marks inactive in the database)

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/users/deleteMe
```

### 2. Delete User (ADMIN)

Deletes user permanently from the database. Must be logged in as an admin to perform this action.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/users/USER_ID_TO_DELETE
```

### 3. Forgot Password

**_/forgotPassword_** endpoint takes an email address and sends a password reset token to that email.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/forgotPassword
```

**_Body:_**

```js
{
    "email": "khairo.khatib@gmail.com"
}
```

### 4. Get All Users (ADMIN)

A GET request to his endpoint lists all users in the database. This request must be performed by an admin.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users
```

### 5. Get Me

Get currently logged in user information

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/users/me
```

### 6. Login

This endpoint is used to log in users and get the authorization token to be used with authorized requests

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/login
```

**_Body:_**

```js
{
    "email": "khairo@gmail.com",
     "password": "{{pass}}"
}
```

### 7. Reset Password

After getting the password reset token make a request to **_/resetPassword/reset_token_** with the new password in the request body to change the password

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/users/resetPassword/PASSWORD_RESET_TOKEN_GOES_HERE
```

**_Body:_**

```js
{
    "password": "{{pass}}",
    "passwordConfirm": "{{pass}}"
}
```

### 8. Signup

This endpoint is used to signup new user account

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/signup
```

**_Body:_**

```js
{
    "name" : "Kai",
    "email": "khairo@gmail.com",
    "password": "{{pass}}",
    "passwordConfirm": "{{pass}}"
}
```

### 9. Update Me

This route updates currently logged in user info. Cannot be used to update password!

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/users/updateMe
```

**_Body:_**

```js
{
    "name": "John"
}
```

### 10. Update Password

**_/updatePassword_** endpoint is straight forward. send current password, new password, and password confirm to update the password. Must be logged in for this action. (JWT token must be sent with the request headers)

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/users/updatePassword
```

**_Body:_**

```js
{
    "currentPass": "{{pass}}",
    "password": "qweqweqwe123",
    "passwordConfirm": "qweqweqwe123s"
}
```

### 11. Update User (ADMIN)

Updates **any** user data in the database. Must be an admin to use this route

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/users/USER_ID_TO_UPDATE
```

**_Body:_**

```js
{
    "name": "Kaii"
}
```

---

# Animals

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

1. [create animal](#1-create-animal)
1. [delete animal](#2-delete-animal)
1. [get all animals](#3-get-all-animals)
1. [get animal by id](#4-get-animal-by-id)
1. [update animal](#5-update-animal)

---

### 1. create animal

Create an animal with data passed to the request body as shown in the example

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/animals
```

**_Body:_**

```js
{
    "id": 2,
    "no": "xxxxxxxx",
    "birth_date": "11/5/19",
    "status": "alive",
    "notes": ""


}
```

### 2. delete animal

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/animals/60ce587fea0844202c02903a
```

### 3. get all animals

Get all animals owned by the user

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/animals
```

**_Headers:_**

| Key           | Value                                                                                                                                                                              | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmQ2Y2MxYzMzNTU2NDE0OGViNzA3MSIsImlhdCI6MTYzMDM2NjkxMywiZXhwIjoxNjM4MTQyOTEzfQ.L0JJJ_ZJwor_rcAunlZZ2nPFQqLFtzKL5r6UK_5-Opw |             |

### 4. get animal by id

Get animal corresponding to a specific ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/animals/61429f1203b09b543c6bb1e2
```

### 5. update animal

Update animal by id. Values to be updated are passed with the request body

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/animals/60ce587fea0844202c02903a
```

**_Body:_**

```js
{
    "birth_date": "11/10/10"
}
```

---

# Weight

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

1. [Add Weight](#1-add-weight)
1. [Delete Weight](#2-delete-weight)
1. [Get Weight](#3-get-weight)
1. [Get all weights](#4-get-all-weights)
1. [Update Weight](#5-update-weight)

---

### 1. Add Weight

Takes an animal ID and value of the weight as shown in the example. It is also possible to specify the **recordedOn** property which is the date and time on which the weight was obtained. **recordedOn** defaults to the time and date of the request if not specified

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/weight
```

**_Body:_**

```js
{
    "value": 74499,
    "animal": "614822f4c9a932577ced6a8f"

}
```

### 2. Delete Weight

Deletes the weight by the ID passed to the API endpoint

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/api/v1/weight/61482659151dc85bd010f483
```

### 3. Get Weight

Fetches the weight matching the ID passed to the API endpoint.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/weight/613d883d05416e081c36ef63
```

### 4. Get all weights

Returns all weight values of the animals owned by the requesting user

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/weight
```

### 5. Update Weight

Deletes the weight by the ID passed to the API endpoint. The values to be updated are passed in the request body as shown in the example

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{URL}}/api/v1/weight/614830dfd2ae2104b84b5784
```

**_Body:_**

```js
{
    "value": 100

}
```

---

# Animal/Weights

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

1. [Add new weight on animal (nested)](#1-add-new-weight-on-animal-nested)
1. [Get all weights on Animal (nested)](#2-get-all-weights-on-animal-nested)
1. [Get daily weight change](#3-get-daily-weight-change)

---

### 1. Add new weight on animal (nested)

Another way to add a weight value to an animal with a nested route

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/animals/60ce587fea0844202c02903a/weights
```

**_Body:_**

```js
{
    "value": 1000
}
```

### 2. Get all weights on Animal (nested)

Get all weights for a specific animal with a nested route. The same result can be achieved by getting all weights and using a query string to specify the animal id.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/api/v1/animals/614837490f3e27615cd8b7f5/weights
```

### 3. Get daily weight change

Takes an animal id in a nested route to weights and a start and end dates in the body. It will return the time period between the two weight records along with daily weight gain/loss value. A weight records corresponding to the start/end dates sent with the request body **must exist** in the database for this to work.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/animals/60ce587fea0844202c029041/weights/dailyWeightChange
```

**_Body:_**

```js
{
    "startDate": "2021-09-14T16:04:26.871Z",
    "endDate": "2021-09-28T06:17:01.253Z"
}
```

---
