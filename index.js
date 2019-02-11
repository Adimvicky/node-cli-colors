
// Create a console 
const _console = Object.create(console);

// Escape sequnces for the different colors
let colorCodes = {
    black : '\x1b[30m',
    bgBlack : '\x1b[40m',
    red : '\x1b[91m',
    bgRed : '\x1b[101m',
    green : '\x1b[922m',
    bgGreen : '\x1b[102m',
    yellow : '\x1b[93m',
    bgYellow : '\x1b[103m',
    blue : '\x1b[94m',
    bgBlue : '\x1b[104m',
    magenta : '\x1b[95m',
    bgMagenta : '\x1b[105m',
    cyan : '\x1b[96m',
    bgCyan : '\x1b[106m',
    white : '\x1b[97m',
    bgWhite : '\x1b[107m',
    underline : '\x1b[4m',
}

// Color reset (for end of lines)
let colorReset = '\x1b[0m';

// Create functions of the `_console.{color}` type
for(let color in colorCodes){
    _console[color] = function(str,...args){
        args = typeof(args) === 'object' && args instanceof Array ? args : [];
        let fullString = str + args.join(' ');
        console.log(`\x1b[${colorCodes[color]}%s${colorReset}`,fullString);
    }
}


// Create the _console.log function
_console.log = function(str,...args){
    if(!args){
        return console.log(str);
    }
    let escapeSequence = '';
    let nonStyleStrings = [];
    if(typeof(args) === 'object' && args instanceof Array && !(args[0] instanceof Array)){
        for(let element of args){
            if(colorCodes.hasOwnProperty(element)){
                escapeSequence += colorCodes[element];
            } else {
               nonStyleStrings.push(element)
            }
        }
    } else {
        if(args[0] instanceof Array){
            for(let element of args[0]){
                if(colorCodes.hasOwnProperty(element)){
                    escapeSequence += colorCodes[element];
                } else {
                   nonStyleStrings.push(element)
                }
            }
        }
        if(typeof(args) === 'string' && !(args in colorCodes)){
            return console.log(str,args);
        } else {
            if(colorCodes.hasOwnProperty(args)){
                escapeSequence += colorCodes[args]
            }
        }
    }
    // Add all strings that aren't styles to the output string
    escapeSequence += '%s '+nonStyleStrings.join(' ');
    // Reset the color of the line back to default at the end of the line
    escapeSequence += colorReset;

    console.log(escapeSequence,str);
}

// Export object
module.exports = _console;