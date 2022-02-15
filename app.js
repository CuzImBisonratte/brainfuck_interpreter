// Get all needed modules
var fs = require('fs');
const { exit } = require('process');
var readline = require('readline');

// Create a readline interface
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create all needed variables
var main_array = [];
var cell = 0;

// Ask the user for a file name
rl.question('Enter a file name: ', function(fileName) {

    // Read the file
    fs.readFile(fileName, function(err, data) {

        // If there is an error
        if (err) {
            console.log('Error reading file: ' + err);
            return;
        }

        // Get how many "<" and ">" are in the file
        var numOfAngles = data.toString().split('<').length - 1;
        var numOfAngles = data.toString().split('>').length - 1 + numOfAngles;

        // Add numOfAngles times a 0 to the main_array
        for (var i = 0; i < numOfAngles; i++) {

            // Add the 0 to the main_array
            main_array.push(0);
        }

        // Split the file into lines
        var lines = data.toString().split('\n');

        // Loop through each line
        for (var i = 0; i < lines.length; i++) {

            // Get the current line
            var line = lines[i];

            // Remove all chars that are NOT brainfuck-syntax ('+', '-', '<', '>', '.', ',', '[', ']')
            line = line.replace(/[^+-<>.,[]/g, '');

            // If the line is empty
            if (line.length === 0) {
                continue;
            } else {

                // Split the line into chars
                var chars = line.split('');

                // Loop through each char
                for (var j = 0; j < chars.length; j++) {

                    // Switch through the chars
                    switch (chars[j]) {

                        // If the char is a '+'
                        case '+':

                            // Add 1 to the cell
                            main_array[cell]++;

                            // Exit the switch
                            break;

                            // If the char is a '-'
                        case '-':

                            // Subtract 1 from the cell
                            main_array[cell]--;

                            // Exit the switch
                            break;

                        default:
                            console.log('Invalid character: ' + chars[j]);
                            break;
                    };
                };
            };
        };
    });
});