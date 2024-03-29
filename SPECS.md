# Server room Drag & Drop

## Specs general outline:

1. Left side - toolbar with entities (and possibly other tools)
2. Right side - editing canvas (grid)
3. Click on an entity/tool - entity is selected
4. Click on the canvas - selected entity is placed
5. Tools list:
   - Wall
   - Window
   - Door
   - Full Cabinet
   - Half Cabinet
   - Quarter Cabinet
6. The canvas should contain rooms, and each cabinet should belong to a room
7. Wall should be resizable
8. Items can be rotated
9. Items can be deleted
10. Items can be moved (Drag & Drop)
11. Items can be connected (?)
12. Additional Viewing page:
    - no editing capabilities
    - additional data about the room is displayed (provided via JSON from the server)
13. History log - all edits should be displayed in a tab at the bottom of the page
14. Every edit to the canvas should be saved to the backend via an API call (contract TBD, flexible)

## questions for PM:

1. Should the entities be placed exactly where dropped? connected to a dot? rounded to the nearest 5 pixels? or whatever I decide?
2. Do we expect other entities for the upcoming release? or just those 6?
3. What items have a size? What items can be rotated?
