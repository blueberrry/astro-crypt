function encodeMessage() {
  const message = document.getElementById('my_message').value;
  console.log('🚀 ~ encodeMessage ~ message:', message);

  console.log('func called');

  const output = document.getElementById('encoded-decoded');

  //textContent > innerText bc security
  output.textContent = 'Encoded: ' + message;
}

function decodeMessage() {
  const encodedMessage = document.getElementById('my_message').value;
  console.log('🚀 ~ decodeMessage ~ encodedMessage:', encodedMessage);

  const output = document.getElementById('encoded-decoded');
  output.textContent = 'Decoded: ' + encodedMessage;
}

function getArbitraryRange(min, max) {
  return Math.random() * (max - min) + min;
}

// New file better structure/readability

class VisualiseCelestialData {
  constructor(svg) {
    this.svg = svg;

    // get width and height of svg for further calculations
    this.width = +svg.attr('width');
    this.height = +svg.attr('height');
  }

  drawOrbits(orbitsData) {
    // method chaining - chain multiple function calls using dot notation
    // allows us to invoke multiple methods on the same object one after another
    // this helps with more concise and readable code
    // each method call operates on the result of the previous method call, which
    // is the selection returned by `selectAll('circle')`/
    // Therefore, it is possible to perform a series of operations on the same set
    // of elements in a concise and sequential manner.
    this.svg
      .selectAll('circle') // selects all els that match the specified string
      .data(orbitsData) // bind array of data with the circle element
      .enter() // enters selection
      .append('circle') // append a circle element for each array item
      .attr('cx', this.width / 2) // the cy of each circle
      .attr('cy', this.height / 2) // the cx of each circle
      .attr('r', (d) => d.radius) // the radius of each circle (radius from data)
      .attr('fill', (d) => d.color); // the fill attribute of each circle (col from data)
  }

  drawPlanets(planetsData) {
    this.svg
      .selectAll('circle.planet')
      .data(planetsData)
      .enter()
      .append('circle')
      .attr('class', 'planet')
      .attr('cx', (d) => this.width / 2 + d.orbitRadius)
      .attr('cy', this.height / 2)
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.color);
  }
}

// class declarations are hoisted to the top of their scope during compilation
// phase.

/**
 * Create the svg with height, width and id parameters
 * @param {string} id
 * @param {number} width
 * @param {number} height
 */

class VisualiseCelestial {
  constructor(containerId, width, height) {
    // bind params to this
    this.containerId = containerId;
    this.width = width;
    this.height = height;

    // Cretes d3 svg with defined width and height
    const svg = d3.select(`#${containerId}`).append('svg').attr('width', width).attr('height', height);

    // Initialise the
    this.visualiser = new VisualiseCelestialData(svg);
  }

  /**
   * method to visualise graphic with data
   * @param {array} orbitsData
   * @param {array} planetsData
   */

  visualiseData(orbitsData, planetsData) {
    this.visualiser.drawOrbits(orbitsData);
    this.visualiser.drawPlanets(planetsData);
  }
}

window.onload = function () {
  const button = document.getElementById('create-random');

  button.addEventListener('click', () => {
    // Define orbit data for this svg
    const orbitsData = [
      { radius: 50, color: 'gray' },
      { radius: 100, color: 'gray' },
      { radius: 150, color: 'gray' },
    ];

    // Define planet data for this svg
    const planetsData = [
      { name: 'Mercury', radius: 5, color: 'orange', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Venus', radius: 8, color: 'yellow', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Earth', radius: 10, color: 'blue', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Mars', radius: 4, color: 'red', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Jupiter', radius: 60, color: 'brown', orbitRadius: getArbitraryRange(-180, 180) },
      { name: 'Saturn', radius: 44, color: 'purple', orbitRadius: getArbitraryRange(-180, 180) },
    ];

    // Initialise svg
    const visualiseCelestial = new VisualiseCelestial('celestial-map', 600, 400);

    // Run method to draw orbits and planets
    return visualiseCelestial.visualiseData(orbitsData, planetsData);
  });
};

// window.onload = function () {
//   const button = document.getElementById
// }

/**
 * 
A common approach to ordering classes in a file is to group them based on their functionality or their relationship to each other. Here are a few common approaches:

Alphabetical Order: Arrange classes alphabetically by their names. This approach provides a consistent and easily understandable order.

Functionality Grouping: Group related classes together based on their functionality. For example, if you have classes related to data manipulation, place them together, and if you have classes related to UI components, place them together.

Dependency Order: If one class depends on another, place the dependent class below the class it depends on. This ensures that when the file is read from top to bottom, all dependencies are already declared.

Inheritance Order: If you're using inheritance, place parent classes before child classes. This helps in understanding the class hierarchy and the flow of inheritance.
*/
