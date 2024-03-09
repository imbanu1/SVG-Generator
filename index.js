import fs from "fs";
import inquirer from "inquirer";

class Shape {
  constructor() {
  }
setTextColor(textColor){
    this.textColor = textColor
}
  setColor(color) {
    this.color = color;
  }
  setText(text) {
    this.text = text;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="80" fill="${this.color}" /> <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
  }
}

class Square extends Shape {
  render() {
    return `<rect width="200" height="200" fill="${this.color}" /> <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
  }
}

const questions = [
  {
    type: "input",
    name: "logotext",
    message: "Enter the text for your logo (up to three characters:)",
  },
  {
    type: "input",
    name: "textcolor",
    message: "Enter a color keyword (OR a hexadecimal number;)",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose from these list of shapes",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shapecolor",
    message: "Enter a color keyword (OR a hexadecimal number;)",
  },
];

function writeToFile(fileName, data) {
  console.log("Writing [${data}] to file [${fileName}]");
  fs.writeFileSync(fileName, data);
  console.log("Generated logo.svg");
}
async function init() {
  console.log("Starting init");
  let svgString = "";
  const svgFile = "logo.svg";

  try {
    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

    // Validate user input (length of text)
    const userText =
      answers.logotext.length > 0 && answers.logotext.length < 4
        ? answers.logotext
        : (() => {
            throw new Error(
              "Invalid user text field detected! Please enter 1-3 Characters, no more and no less"
            );
          })();

    console.log(`User text: [${userText}]`);
    const userFontColor = answers["textcolor"];
    console.log(`User font color: [${userFontColor}]`);
    const userShapeColor = answers["shapecolor"];
    console.log(`User shape color: [${userShapeColor}]`);
    const userShapeType = answers["shape"];
    console.log(`User entered shape = [${userShapeType}]`);

    let userShape;

    switch (userShapeType.toLowerCase()) {
      case "square":
        userShape = new Square();
        console.log("User selected Square shape");
        break;
      case "circle":
        userShape = new Circle();
        console.log("User selected Circle shape");
        break;
      case "triangle":
        userShape = new Triangle();
        console.log("User selected Triangle shape");
        break;
      default:
        throw new Error("Invalid shape!");
    }
    console.log(userShapeColor)
    userShape.setColor(userShapeColor);
    userShape.setTextColor(userFontColor);
    userShape.setText(userText);

    // Create a new Svg instance and compose the SVG string by combining the width, height, and rendered shape
    svgString = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${userShape.render()}</svg>`;
    console.log("Displaying shape:\n\n" + svgString);

    console.log("Shape generation complete!"); // Log a message indicating the completion of the shape generation process
    console.log("Writing shape to file..."); // Log a message indicating that the generated shape is being written to a file
    writeToFile(svgFile, svgString); // Write the generated SVG string to a file named 'logo.svg'
  } catch (error) {
    console.error(error.message);
    return;
  }

  // Display the generated shape in the console log
 
}

// Execute the application by calling the init function
init();
