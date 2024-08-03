'''mermaid
    sequenceDiagram
    participant browser
    participant server
    Note right of browser: User push save.


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{ "content": "content", "date": "2023-1-1" }, ... ]
    deactivate server
    
    Note left of server: Server reply with code 201 and sends new Json file with update.
    Note right of browser: Javascript updates new content dynamicly with out reloading other files 
'''
