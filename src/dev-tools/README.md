### Enable devtools

To enable devtools add to `.env`

```
REACT_APP_DEV_TOOLS=true
```

### Response Data

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
