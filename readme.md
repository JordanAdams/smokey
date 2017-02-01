# :bear: Smokey
> Automated smoke testing tool

## Installation

Currently requires manual installation:

```
$ git clone git@github.com:JordanAdams/smokey.git
$ cd smokey
$ npm install
$ npm link
```

## Setup

Smokey is configured using a JSON file at `~/.smokey-config.json`. This file is structured into apps which contain a set of environments and endpoints. You should consider keeping a `default` app as this will be called when no app name is passed.

```json
{
  "default": {
    "environments": {
      "local": {
        "url": "http://localhost:8080"
      },
      "stage": {
        "url": "http://stage.example.com"
      },
      "live": {
        "url": "http://example.com"
      }
    },
    "endpoints": [
      "/",
      "/foo",
      "/bar/baz?x=y"
    ]
  },
  "myotherapp": {
    "environments": {
      "production": {
        "url": "example2.com"
      }
    },
    "endpoints": [
      "/",
      "/xyz.html"
    ]
  }
}
```

## Usage

Check a given environment on the default app.

    $ smokey <environment>

Open endpoints in your default browser

    $ smokey <environment> -o

Target a specific app

    $ smokey -a <app> <environment>
