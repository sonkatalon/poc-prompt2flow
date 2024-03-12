# PoC prompt to flow

## Usage

```bash
export DEBUG=true # optional, turn on OpenAI debug mode
export OPENAI_API_KEY=sk-xxx

npm run testX
```

### Test 1: click

Given the input prompt "create a new appointment".
With an existing test flow like this:

```json
[
  {
    "action": {
      "type": "navigate",
      "parameters": {
        "value": "https://katalon-demo-cura.herokuapp.com/"
      }
    }
  }
]
```

The expected output looks like below. It adds one more step to click a button to achive the goal.

```json
{
  "click": {
    "target": {
      "locators": [
        {
          "type": "css",
          "value": "#btn-make-appointment"
        }
      ]
    }
  }
}
```

### Test 2: login

This test continues from the previous one.
The prompt is `fill the login form and submit with the given credentials` and the test flow includes two steps (`navigate` and `click`, see above).

<table><tr><td valign="top">

```json
{
  "input": {
    "target": {
      "locators": [
        {
          "type": "css",
          "value": "#txt-username"
        }
      ]
    },
    "value": "John Doe"
  }
}
{
  "input": {
    "target": {
      "locators": [
        {
          "type": "css",
          "value": "#txt-password"
        }
      ]
    },
    "value": "ThisIsNotAPassword"
  }
}
{
  "click": {
    "target": {
      "locators": [
        {
          "type": "css",
          "value": "#btn-login"
        }
      ]
    }
  }
}
```

</td><td valign="top">

With just one prompt, the LLM adds three consecutive steps to fill the form and submit it.

</td></tr></table>

### Test 3: cellphone

This test is unrelated to the other tests.
Given a prompt `click to view iphone 15 plus` and a new website, the LLM locate the link to the product and click on it.

```json
{
  "click": {
    "target": {
      "locators": [
        {
          "type": "css",
          "value": "a[href='/product/apple-iphone-15-plus']"
        }
      ]
    }
  }
}
```
