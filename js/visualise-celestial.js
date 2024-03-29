function visualiseCelestial() {
  // Implementation for visualising celestial orbits using D3.js

  function createSvg() {
    const w = 600;
    const h = 400;

    // todo: wrap prettier name?
    const svg = d3.select('#celestial-map').append('svg').attr('width', w).attr('height', h);

    const orbitsData = [
      { radius: 50, color: 'gray' },
      { radius: 100, color: 'gray' },
      { radius: 150, color: 'gray' },
    ];

    // method chaining - chain multiple function calls using dot notation
    // allows us to invoke multiple methods on the same object one after another
    // this helps with more concise and readable code
    // each method call operates on the result of the previous method call, which
    // is the selection returned by `selectAll('circle')`/
    // Therefore, it is possible to perform a series of operations on the same set
    // of elements in a concise and sequential manner.
    svg
      .selectAll('circle') // selects all els that match the specified string
      .data(orbitsData) // bind array of data with the circle element
      .enter() // enters selection
      .append('circle') // append a circle element for each array item
      .attr('cx', w / 2) // the cy of each circle
      .attr('cy', h / 2) // the cx of each circle
      .attr('r', (d) => d.radius) // the radius of each circle (radius from data)
      .attr('fill', (d) => d.color); // the fill attribute of each circle (col from data)

    // Define planet data
    const planetsData = [
      { name: 'Mercury', radius: 5, color: 'orange', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Venus', radius: 8, color: 'yellow', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Earth', radius: 10, color: 'blue', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Mars', radius: 4, color: 'red', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Jupiter', radius: 60, color: 'brown', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Saturn', radius: 44, color: 'purple', orbitRadius: getArbitraryRange(-180, 180) },
    ];

    // draw planets
    svg
      .selectAll('circle.planet')
      .data(planetsData)
      .enter()
      .append('circle')
      .attr('class', 'planet')
      .attr('cx', (d) => w / 2 + d.orbitRadius)
      .attr('cy', h / 2)
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.color);
  }
  createSvg();
}

window.onload = function () {
  visualiseCelestial();
};
