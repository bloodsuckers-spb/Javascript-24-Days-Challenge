# Challenge Advent of CSS and JS

### Day 1: Pomodoro Timer

![pomodoro-timer](/images/day1-screen.png 'pomodoro-timer')

#### Users should be able to:

- Start the timer by clicking on the start link/button.
- Once the user clicks start, the word start will change to stop. Then, the user can click on the stop button to make the timer stop.
- Click on the gear icon to change the length (minutes and seconds) of the timer.
- Once the timer finishes, the ring should change from green to red and an alert message is passed to the browser.

Deploy: [Pomodoro Timer](https://bloodsuckers-spb.github.io/advent-of-js/day01/ 'Pomodoro Timer')

### Day 2: E-Commerce Component

![E-Commerce Component](/images/day2-screen.png 'E-Commerce Component')

#### Users should be able to:

- View the plates on the left side of the screen and add them to your cart on the right side.
- When there are no plates within your cart, you should see a message that says, "Your cart is empty."
- When a plate is added to your cart, the Subtotal and Totals will automatically update.
- When products are in your cart, you should be able to increase and decrease the quantity.
  - A user should not be able to mark the quantity as a negative number.
  - If the quantity goes down to 0, the user will have the option to delete or remove the product from their cart entirely.
- Tax is based on the state of Tennessee sales tax: 0.0975

Deploy: [E-Commerce Component](https://bloodsuckers-spb.github.io/advent-of-js/day02/ 'E-Commerce Component')

### Day 3: Piano

![Piano](/images/day3-screen.png 'Piano')

#### Users should be able to:

- When a user clicks on a specific key, it will play an audio clip.
  - The audio clips are numbered, but I did not specifically number the keys. You can pick which key should be associated with each audio file.
  - If a user clicks on one key, then immediately clicks on a second key. The 2 files should both play. Meaning, clicking on one key will not stop an existing audio file from playing.

Deploy: [Piano](https://bloodsuckers-spb.github.io/advent-of-js/day03/ 'Piano')

### Day 4: Keyboard

![keyboard](/images/day4-screen.png 'keyboard')

#### Users should be able to:

- A random letter will start to jiggle.
- The user should type the same key that's jiggling and it will stop.
- A new, random key will start jiggling

Deploy: [keyboard](https://bloodsuckers-spb.github.io/advent-of-js/day04/ 'keyboard')

### Day 5: Multiple Checkboxes

![Multiple Checkboxes](/images/day5-screen.png 'Multiple Checkboxes')

#### Users should be able to:

- See the list of podcast episodes
- Check one episode, shift-click to select all the episodes in between

Deploy: [Multiple Checkboxes](https://bloodsuckers-spb.github.io/advent-of-js/day05/ 'Multiple Checkboxes')

### Day 6: Range Slider

![Range Slider](/images/day6-screen.png 'Range Slider')

#### Users should be able to:

- Move the knob on the range and the dollar amount above it will update.

Deploy: [Range Slider](https://bloodsuckers-spb.github.io/advent-of-js/day06/ 'Range Slider')

### Day 10: Password Verifier

![password-verifier](/images/day10-screen.png 'Password Verifier')

#### Users should be able to:

- type in a digit and automatically be taken to the next input
- paste in a 4 digit code

Deploy: [Password Verifier](https://bloodsuckers-spb.github.io/advent-of-js/day10/ 'Password Verifier')

### Day 12: Rock, Paper, Scissors

![Rock, Paper, Scissors](/images/day12-screen.png 'Rock, Paper, Scissors')

#### Users should be able to:

- play the game and see the results

Deploy: [Rock, Paper, Scissors](https://bloodsuckers-spb.github.io/advent-of-js/day12/ 'Rock, Paper, Scissors')

### Day 14: Calendar Viewer

![calendar viewer](/images/day14-screen.png 'Calendar Viewer')

#### Users should be able to:

- view calendar with correct days with the current day highlighted
- navigate through different months

Deploy: [calendar viewer](https://bloodsuckers-spb.github.io/advent-of-js/day14/ 'Calendar Viewer')

### Day 16: Star Rating

![Star Rating](/images/day16-screen.png 'Star Rating')

#### Users should be able to:

- hover to select a star rating

Deploy: [Star Rating](https://bloodsuckers-spb.github.io/advent-of-js/day16/ 'Star Rating')

### Day 18: Password Generator

![Password Generator](/images/day18-screen.png 'Password Generator')

#### Users should be able to:

- The text input field should automatically update as the range field changes or one of the items is checked
- The user can click on the copy icon to the right of the input field to copy the password to their clipboard.
- When a user clicks on the copy icon, a class of "copied" should be added to the button. This will display the word "Copied" and change the text color to green.
- After 5 seconds, the "copied" class should be removed from the button.
- The range slider should allow the user to change the password length. The minimum amount is 6 and the max is 32 (limits are imposed through the HTML element)
- Checking symbols will allow symbols to be used in the password
- Checking numbers will allow numbers to be used in the password
- Checking lowercase letters will allow lowercase letters to be used in the password
- Checking uppercase letters will allow uppercase letters to be used in the password
- Checking exclude similar letters will remove similar letters from the password (i, l, 1, L, o, 0, O)

Deploy: [Password Generator](https://bloodsuckers-spb.github.io/advent-of-js/day18/ 'Password Generator')

### Day 19: Form Validation

![Form Validation](/images/day19-screen.png 'Form Validation')

#### Users should be able to:

- When the user unfocuses a field, the form should perform a validation check
- All the fields are required
- Should enter a properly formatted email address
- The password and confirm password fields should match
- Clicking on the show / hide button on the password field should change the visibility of the password (simply change the input `type` from `password` to `text` or vice versa)

Deploy: [Form Validation](https://bloodsuckers-spb.github.io/advent-of-js/day19/ 'Form Validation')
