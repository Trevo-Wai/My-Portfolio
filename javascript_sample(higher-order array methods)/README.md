
This project analyzes driver route data and identifies the top drivers based on their total route counts across various cities.

---

## Features
- Sums up route counts for each driver.
- Sorts drivers by their total route counts in descending order.
- Outputs the top drivers in a numbered list format.

---

## Requirements
- **Node.js**: Ensure you have Node.js installed on your machine.

---

## How it work

**.map(([driver, routes]) => ...)**
-Loops over each [driver, routes] pair from the array.
-Transforms each pair into a new array [driver, totalRoutes].

**Inside the .map():**
-Object.values(routes): Extracts just the route counts (the values from the routes object).
-Example for "Aung": [50, 25, 12].

**.reduce((sum, count) => sum + count, 0):** 
-Sums up all the route counts.
-Example for [50, 25, 12]:

**.sort((a, b) => b[1] - a[1])**
Sorts the array in descending order based on the second value (totalRoutes).


## How to Run
1. Clone or download the project.
2. Open a terminal or open VS Code and navigate to the `javascript_sample(higher-order array methods)` folder:
```bash
    node findTopDrivers.js
    ```
