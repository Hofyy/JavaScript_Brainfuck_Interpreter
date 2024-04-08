const fs = require('fs');

const getFileContent = function () {
  return fs.readFileSync("./test.bf", { encoding: "utf8" });
}

let position = 0;
let cursorposition = 0;
let data = [];
let loops = [];
let inputPosition = 0;
var output = ""

for (let i = 0; i < 100; i++) {
  data.push(0);
}

const interpret = function (content, input) {
  while (position < content.length) {
    const currentChar = content[position];

    if (currentChar == "<") {
      cursorposition--;
    } else if (currentChar == ">") {
      cursorposition++;
    } else if (currentChar == ",") {
      if (input) {
        let ascii = input[inputPosition].charCodeAt(0)
        data[cursorposition] = ascii
        inputPosition++
      }
    } else if (currentChar == "+") {
      data[cursorposition]++;
    } else if (currentChar == "-") {
      data[cursorposition]--;
    } else if (currentChar == "[") {
      if (data[cursorposition] === 0) {
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
      if (data[cursorposition] !== 0) {
        position = loops[loops.length - 1];
      } else {
        loops.pop();
      }
    } else if (currentChar == ".") {
      const asciiCode = data[cursorposition];
      const string = String.fromCharCode(asciiCode);
      output += string
    } else {
      content[position] = ""
    }

    position++;
  }
}

interpret(getFileContent(), "")
console.log(output)
