### Enable devtools

To enable devtools add to `.env`

```
REACT_APP_DEV_TOOLS=true
```

### Response data

create a _response.json_ in `/src/DevTools/fixtures/response.json`

```json
{
  "login": {
    "error": {
      "status": 400,
      "response": {
        "message": {
          "userName": "Invalid username"
        }
      }
    }
  }
}
```

> Add _`login.error`_ in response-key of Request tab

> 💡 Response key should be path of object

### Creating custom-tabs

create a _custom-tabs.js_ in `/src/DevTools/tabs/custom-tabs.js`

```js
const tabs = [
  {
    name: 'Login',
    path: 'login',
    Component: Login,
  },
];

export default tabs;
```

### Creating form-data

create a _form-data.json_ in `/src/DevTools/fixtures/form-data.json`

```json
{
  "forms": {
    "/login": {
      "name": "Login",
      "data": {
        "#username": "alpha",
        "#password": "123456"
      }
    }
  }
}
```

> 💡 _Every **key** field inside data is a css querySelector_
