const Shape = require('./lib/Shapes');
const Triangle = require('./lib/Triangle');
const Circle = require('./lib/Circle');
const Square = require('./lib/Square');

describe('Shape Classes', () => {
    describe('Shape', () => {
        it('should throw an error when render is called', () => {
            const shape = new Shape('red');
            expect(() => shape.render()).toThrowError("Abstract method 'render' must be implemented in the derived class.");
        });
    });

    describe('Triangle', () => {
        it('render a triangle SVG', () => {
            const triangle = new Triangle('blue');
            expect(triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
        });
    });

    describe('Circle', () => {
        it('render a circle SVG', () => {
            const circle = new Circle('green');
            expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="green" />');
        });
    });

    describe('Square', () => {
        it('render a square SVG', () => {
            const square = new Square('yellow');
            expect(square.render()).toEqual('<rect width="200" height="200" fill="yellow" />');
        });
    });
});