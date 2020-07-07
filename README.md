# Frontend Recruiting Challenge
A GraphQL CRUD API has been made available at [https://subscale.xyz/graphql](https://subscale.xyz/graphql), with
a GraphiQL development interface at [https://subscale.xyz/graphiql](https://subscale.xyz/graphiql).

Your task is to use a JavaScript or TypeScript frontend web framework (preferably React,
but Vue or Angular are also acceptable) to create a simple web interface for this API.

You may start from scratch, from a project generator (e.g., `create-react-app`),
or from any project template of your choice.

You are free to make use of any dependencies available through NPM.

If you have any questions or run into issues, feel free to email them at any time to David at david@subscale.io.

# Challenge Overview

## Data
The API exposes read and write functionality for two different types of objects: "parts" and "files".

**Parts**
* Parts have the following associated data fields:
    * id: number
    * label: string
    * description: string
    * createdAt: string
* Thumbnails for parts can be accessed at:
```javascript
const thumbnailUrl = `https://subscale.xyz/static/thumbnails/${id}-${label}.png`
```

**Files**
* Files have the following associated data fields:
    * id: number
    * partId: number
    * basename: string
    * createdAt: string 
* Each part may have one or multiple associated files (some parts may have zero).

The API also exposes some basic authentication functionality.

The "API Details" section below describes how to access the available data, and also how to authenticate.

## Requirements

#### Requirement 1: Parts Table
The primary page of your web app should display the parts as a list/table.

Each part should be displayed with its thumbnail, id, label, description, and creation date.

The "view" of each part (perhaps a component) should also have a section
listing any files associated with that part.

Each file should be associated with a download link of `https://subscale.xyz/static/files/<basename>`.
(This download link will always be a 404 Not Found, but that's okay -- it should still be included.)

#### Requirement 2: Authentication
When a user first visits the site, they should be presented with a login page.

The login page should ask for their email and password.

The parts table from Requirement 1 should not be visible or accessible prior to successful login.
(A redirect or similar is sufficient.)

On successful login, the user should be redirected to the page from Requirement 1.

On failure, the user should receive *some* visual indication that their login attempt failed.

(For convenience, read access to the API does not require login, so you can work on the requirements in either order.) 

## Assessment

Your submission will be assessed based on the following:

* Functionality -- the basic capabilities described above should work properly
* Architecture -- we want to see a modular, component-driven design
* Aesthetic -- we don't expect anything elaborate, but the interface should feel "modern"
    * Feel free to use a component library (like Bootstrap, Material UI, Ant Design, etc.) if you like.

The design requirements are intentionally open-ended -- you may design the interface however you like.
In particular, as long you implement the basic functionality described above,
you are **encouraged** to make design decisions that simplify the implementation.  

## Submission

Your solution can be submitted through the following steps:

* Upload the project as a private repository on GitHub
* Add David Montague (GitHub user dmontagu) to the repository
* Email David at david@subscale.io once your submission is ready

# API Details

## GraphQL
This API is a GraphQL API.

If you are familiar with a GraphQL client library like Apollo, feel free to use it.

If not, you can still easily request data from the GraphQL endpoint using standard HTTP requests.
(You will not be judged based on your approach to handling network requests.) 

If you aren't familiar with GraphQL, the main difference between GraphQL and a more traditional REST API
is that there is only a single endpoint ([https://subscale.xyz/graphql](https://subscale.xyz/graphql)),
and all requests can be made by sending POST requests to this endpoint with a payload of the form
`{"query": "<queryString>"}`, where `<queryString>` is a GraphQL-format query. Examples of such queries
that can be used to complete this challenge are included below.

(If you are interested, you can learn more about GraphQL [here](https://graphql.org/learn/).)

## Reading Data

For example, to request the data about all parts, you could use the following as the `queryString`:

```javascript
const queryString = `query Parts {
  parts {
    nodes {
        id
        label
        description
        createdAt
    }
  }
}
`
```

and retrieve the data via:
```javascript
async function runQuery(queryString) {
    const response = await fetch("https://subscale.xyz/graphql", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: queryString}),
    })
    return response.json()
}

// Log response data to console:
runQuery(queryString).then(data => console.log(data))
```
(You are free to use whatever functions/libraries you prefer for handling network requests.)

To request the data about all *files*, you could use the following as the `queryString`:
```javascript
const queryString = `
query Files {
  files {
    nodes {
      id
      partId
      basename
      createdAt
    }
  }
}
`
```

In the development-oriented GraphiQL interface at [https://subscale.xyz/graphiql](https://subscale.xyz/graphiql)
you can interactively build queries and view the results of their execution.
(Hint: it is possible to request the parts and files together with files grouped by part in a single query.)

## Authentication
To authenticate, you should the following `queryString`, replacing the email and password as appropriate:

```javascript
const queryString = `
mutation Authenticate {
  authenticate(input: {email: "me@subscale.io", password: "my_password"}) {
    jwtToken
  }
}
`
```

On successful login, you should receive a response that looks like this:
```json
{
  "data": {
    "authenticate": {
      "jwtToken": "eyJhbGc..."
    }
  }
}
```

If login fails, you should receive a response like this:
```json
{
  "data": {
    "authenticate": {
      "jwtToken": null
    }
  }
}
```

The following (email, password) combinations should work for login:

* email: `a@subscale.io`, password: `pw_a`
* email: `b@subscale.io`, password: `pw_b`
* email: `c@subscale.io`, password: `pw_c`

Any other combination should result in a failure.

-----

(You may notice that some aspects of this API and the snippets above run counter to best/common practices.
While you are not *expected* to notice or comment on these, they may be a source of discussion
in a follow-up interview.)
