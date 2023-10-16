# Neo Buddy
A react web-app that utilizes nasa's Asteroids neoWs api service to find an asteroid that made a close pass on your birthday.

# Project Description
Neo buddy is a react web-app that accepts a date from a user, and searches for asteroids that made close approaches on that day.
Then, depending on user input, it can filter out an asteroid that either flew the closest to earth, or one that flew by closest to the user specified time.
After filtering an asteroid out, it will display details about that asteroid like its name, size, orbit distance, etc.

This project was created for me to learn and practice front-end development using Reactjs. Additionally, it was also developed to be submitted as my CS50x final project.

# Usage
You can access the web-app through this [link]().

To find an asteroid, set the date using this date picker, and optionally, you can set your specified time right beside it. (By default it is set to 00:00)
![Highlighted date picker](https://github.com/Makoch1/neo-bd/assets/94661022/6a5a0a9f-ac73-4c36-b674-a1261c0a28e9)

If all goes well, you should now see the asteroid's details.
![Asteroid details displayed](https://github.com/Makoch1/neo-bd/assets/94661022/570b2247-49af-4bef-a7c2-50fc73cb23b0)


By default it will filter out the asteroids by distance. To set it to filter by time, just toggle this button. After that, it should immediately change if it finds a different asteroids.
![Highlighted button](https://github.com/Makoch1/neo-bd/assets/94661022/1d20de0a-72d4-499e-9b15-c6a34d98b5f2)