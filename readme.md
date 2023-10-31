# It's Time to Bowl! :bowling:

We're not going to keep score on paper.  Oooh no, that's what computers are for.

Even [Wikipedia](https://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring) knows that. "Correctly calculating bonus points can be difficult, especially when combinations of strikes and spares come in successive frames. In modern times, however, this has been overcome with automated scoring systems, linked to the pinsetters that set and clear the pins between frames."

This problem has been "overcome with with automated scoring systems", written by someone like yourselves.  Luckily, someone has already written our tests.  We just have to write the code that passes them.


## Setup

- fork and clone

- install our dependencies
```shell
npm i
```

- Open another tab and start the server (this restarts node automatically on changes)
```shell
npm start
```

## Run the tests
After the setup is complete, run your tests to see how your app fares.
```shell
npm t
```

Pro Tip:  Comment out "future" tests.  Focus on one at a time.

### Run the test in watch mode
To re-run the test once some file changes:
```shell
npm run test:watch
```

### Run the test coverage
To see the app test coverage run:
```shell
npm run test:coverage
```
It will output a report on the terminal and a HTML file located in `.coverage/lcov-report/index.html`.

## Debug with VS Code
There are 2 configurations in `.vscode/launch.json`: *Debug* and *Attach*. This allow us to add breakepoints in the code.

- __Debug__: Will run nodemon in watch mode and attach the debugger. No more acctions needed.

- __Attach__: Requires that you run `npm start` in the terminal. Then it will attach the debugger to that process.

## Production Build
- To build for productions, execute the command:
```shell
npm run build
```
It will output thee file `out/game.js`.
- Then, to run the game, set your environment variables and run with node js, for example:
```shell
PORT=8080 node out/game.js
```
And you can open your browser at `http://localhost:8080` to see the server running.

## Routes
| Method | URL | Description |
|:---|:----|:---|
| `[GET]` | `/` | Returns a JSON object: `{ "game": "Bowling" }`. |
| `[GET]` | `/start` | Start a new game, returning a JSON object with information of the current board. |
| `[POST]` | `/bowl/:pins` | Register the number of pin (`:pins`) in the board. If there is no more frames to play, the result's attribute `gameover` will be `true`. |
| `[GET]` | `/score` | Returns the score of the current game and the board in a JSON object. |

## Bonus:
- Extract your routes to a separate file.
- Add your own example bowls in test/gameTest.js
- Clean up your code.  Look for items to extract to functions.
- Encapsulate some of this in an object.
   - Add methods to the object.

## Want to test manually?  Here are some suggested examples:

- all gutter balls, score: 0
- all balls hit one pin; score: 20
- roll 4, 2.  Roll 3, 5; score: (6+8) = 14
- roll a spare: 4, 6 (spare), 3, 1; score: (10 + 3) + 3 = 16
- roll a strike: 10 (strike), 6, 2; score: = (10 + 8) + 8 = 26
## Scoring  (from [Wikipedia](https://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring))
In general, one point is scored for each pin that is knocked over. So if a player bowls over three pins with the first shot, then six with the second, the player would receive a total of nine points for that frame. If a player knocks down nine pins with the first shot, but misses with the second, the player would also score nine. When a player fails to knock down all ten pins after their second ball it is known as an open frame.


In the event that all ten pins are knocked over by a player in a single frame, bonuses are awarded.

### Strike

When all ten pins are knocked down with the first ball (called a strike and typically rendered as an "X" on a scoresheet), a player is awarded ten points, plus a bonus of whatever is scored with the next two balls. In this way, the points scored for the two balls after the strike are counted twice.

#### Example:
Frame 1, ball 1: 10 pins (strike)
Frame 2, ball 1: 3 pins
Frame 2, ball 2: 6 pins

The total score from these throws is:
Frame one: 10 + (3 + 6) = 19
Frame two: 3 + 6 = 9
TOTAL = 28

### Spare:

A "spare" is awarded when no pins are left standing after the second ball of a frame; i.e., a player uses both balls of a frame to clear all ten pins. A player achieving a spare is awarded ten points, plus a bonus of whatever is scored with the next ball (only the first ball is counted). It is typically rendered as a slash on scoresheets in place of the second pin count for a frame.

#### Example:
Frame 1, ball 1: 7 pins
Frame 1, ball 2: 3 pins (spare)
Frame 2, ball 1: 4 pins
Frame 2, ball 2: 2 pins

The total score from these throws is:
Frame one: 7 + 3 + 4 (bonus) = 14
Frame two: 4 + 2 = 6
TOTAL = 20

### Tenth frame
A player who bowls a strike in the tenth (final) frame is awarded two extra balls to allow for the bonus points.
A player who bowls a spare in the tenth (final) frame is awarded one extra ball to allow for the bonus points.

### Perfect (300) game

The maximum score in a game of ten-pin is 300, scored by making 12 strikes in a row.
Before 1908, no one ever received an award for a game greater than 298.

- Scoring Calculator: http://www.bowlinggenius.com
