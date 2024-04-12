const fs = require('fs');



// Function to use Brainfuck with fs
/* const getFileContent = function () {
  return fs.readFileSync("./test.bf", { encoding: "utf8" });
} */

// Decrement data on cursor position
const decrementData = function (data, cursorPosition) {
  data[cursorPosition]--;
}

// Increment data on cursor position
const incrementData = function (data, cursorPosition) {
  data[cursorPosition]++;
}

// Move cursor left
const moveLeft = function (cursorPosition) {
  cursorPosition--
  return cursorPosition
}

// Move cursor right
const moveRight = function (cursorPosition) {
  cursorPosition++
  return cursorPosition
}

// Read input and convert to Ascii value
const setInputData = (input, inputPosition, data, cursorPosition) => {
  const ascii = input[inputPosition]?.charCodeAt(0) || 0;
  data[cursorPosition] = ascii;
  return inputPosition + 1;
}

const tokenizer = function (content, input) {
  let position = 0;
  let cursorPosition = 0;
  let data = Array(100).fill(0);
  let loops = [];
  let inputPosition = 0;
  let output = "";

  while (position < content.length) {
    const currentChar = content[position];

    if (currentChar == "<") {
      cursorPosition = moveLeft(cursorPosition)
    } else if (currentChar == ">") {
      cursorPosition = moveRight(cursorPosition)
    } else if (currentChar == ",") {
      if (input) {
        inputPosition = setInputData(input, inputPosition, data, cursorPosition);
      }
    } else if (currentChar == "+") {
      incrementData(data, cursorPosition)
    } else if (currentChar == "-") {
      decrementData(data, cursorPosition)
    } else if (currentChar == "[") {
      if (data[cursorPosition] === 0) {
        let loopDepth = 1;
        while (loopDepth !== 0) {
          position++;
          if (content[position] === "[") loopDepth++;
          else if (content[position] === "]") loopDepth--;
        }
      } else {
        loops.push(position);
      }
    } else if (currentChar == "]") {
      if (data[cursorPosition] !== 0) {
        position = loops[loops.length - 1];
      } else {
        loops.pop();
      }
    } else if (currentChar == ".") {
      const asciiCode = data[cursorPosition];
      const string = String.fromCharCode(asciiCode);
      output += string;
    } else {
    }

    position++;
  }

  return output; // Return the output string
}

const output = tokenizer(getFileContent(), "");
console.log(output);
