```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: types note into form input
    user->>browser: clicks on save and submits form

    Note right of browser: The browser sends the form data to the server

    browser->>server: POST Form Data[note: user's note] https://studies.cs.helsinki.fi/exampleapp/new_note

    activate server
    Note left of server: Server stores new note in DB

    server-->>browser: Response headers tell browser to reload page https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2024-1-1" }, ... ]
    deactivate server

    activate browser
    Note right of browser: The browser executes the callback function that renders the notes

    browser-->>user: browser displays updated note list
    deactivate browser
```