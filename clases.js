class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // Method to calculate area of the rectangle
    calculateArea() {
        return this.width * this.height;
    }

    // Method to calculate perimeter of the rectangle
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}

// Creating an instance of the Rectangle class
let rect = new Rectangle(5, 3);

// Calling methods of the Rectangle class
console.log("\nRectangle class\nArea:", rect.calculateArea()); // Output: Area: 15
console.log("Perimeter:", rect.calculatePerimeter()); // Output: Perimeter: 16
