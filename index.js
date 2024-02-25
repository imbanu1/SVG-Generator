const fs = require ('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('.lib/shapes');


const questions = [
    {
        type: "input",
        name: "logotext",
        message: "Enter the text for your logo (uo to three characters:)",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter a color keyword (OR a hexadecimal number;)",
    }
    {
        type: "list",
        name: "shape",
        message: "Choose from these list of shapes",
        choices: ["Circle", "Triangle", "Square"],
    }
    {
        type: "input",
        name: "shape-color",
        message: "Enter a color keyword (OR a hexadecimal number;)",
    }
    

    
]