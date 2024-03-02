class Shape {
    constructor(color) {
        this.color = color;
    }

    render() {
        
        throw new Error("Abstract method 'render' must be implemented in the derived class.");
    }
}

module.exports = Shape