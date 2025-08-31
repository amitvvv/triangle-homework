# Triangle Homework

Development exercise – building an interface to display a triangle and its angles.

---

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the browser at:
   ```
   http://localhost:5173
   ```

---

## Application Structure

- **InputPage (/input)**  
  Allows the user to input three points (X, Y).  
  Includes a button *"Show Triangle"* which navigates to the display page.

- **DisplayPage (/display)**  
  - Draws the triangle in an **SVG** area of 800×800 pixels.  
  - At each vertex, a small arc is drawn to mark the angle.  
  - The numeric values of the three angles are displayed inside the triangle.  
  - Includes a button *"Highlight Angles"* which toggles an animation on the arcs.

- **TriangleView Component**  
  Responsible for all geometry calculations (vectors, dot products, angles) and for rendering the triangle and arcs inside the SVG.

---

## Required Explanations

1. **Which method did I use to draw the triangle? Why?**  
   I used **SVG elements** (`<polygon>`, `<path>`, `<text>`).  
   SVG was chosen because it provides sharp rendering at any zoom level, precise control over coordinates, and flexible styling options.

2. **How did I calculate the angle values?**  
   For each vertex, I computed the angle between two outgoing vectors using the dot product formula:  
   ```
   angle = arccos( (u · v) / (|u||v|) )
   ```
   The result is converted from radians to degrees.

3. **What was challenging in the exercise?**  
   Positioning the arcs and the angle labels so that they are always clear and visible, even when the triangle is very narrow, obtuse, or acute.

4. **Is there anything I did not manage to solve? Gaps?**  
   I did not implement advanced validation of the input points. For example, preventing overlapping points or handling the case where all three points lie on the same line.

5. **Did I use any external tools (including AI)?**  
   Yes – I used ChatGPT as a helper for geometric calculations and design ideas.  
   However, the overall structure, decisions, and final solution were done independently.

---

## Additional Considerations

- **Usability** – clear forms for entering points, intuitive button to toggle angle highlighting.  
- **Clean Code** – project split into dedicated files/components (`InputPage`, `DisplayPage`, `TriangleView`).  
- **Independent Thinking** – while not perfect, the solution shows understanding of React, SVG, and basic geometry.

---

## Credit

This project was built as part of a home assignment.
