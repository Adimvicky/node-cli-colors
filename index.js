
// Create a console 
const _console = Object.create(console);

// Escape sequnces for the different colors
_console.colorCodes = {
    black : '\x1b[30m',
    bgBlack : '\x1b[40m',
    red : '\x1b[31m',
    bgRed : '\x1b[41m',
    green : '\x1b[32m',
    bgGreen : '\x1b[42m',
    yellow : '\x1b[33m',
    bgYellow : '\x1b[43m',
    blue : '\x1b[34m',
    bgBlue : '\x1b[44m',
    magenta : '\x1b[35m',
    bgMagenta : '\x1b[45m',
    cyan : '\x1b[36m',
    bgCyan : '\x1b[46m',
    white : '\x1b[37m',
    bgWhite : '\x1b[47m',
    underline : '\x1b[4m',
}

// Color reset (for end of lines)
_console.colorReset = '\x1b[0m';

// Create functions of the `_console.{color}` type
for(let color in _console.colorCodes){
    _console[color] = function(str,...args){
        args = typeof(args) === 'object' && args instanceof Array ? args : [];
        let fullString = str + args.join(' ');
        console.log(`\x1b[${_console.colorCodes[color]}%s${_console.colorReset}`,fullString);
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
            if(_console.colorCodes.hasOwnProperty(element)){
                escapeSequence += _console.colorCodes[element];
            } else {
               nonStyleStrings.push(element)
            }
        }
    } else {
        if(args[0] instanceof Array){
            for(let element of args[0]){
                if(_console.colorCodes.hasOwnProperty(element)){
                    escapeSequence += _console.colorCodes[element];
                } else {
                   nonStyleStrings.push(element)
                }
            }
        }
        if(typeof(args) === 'string' && !(args in _console.colorCodes)){
            return console.log(str,args);
        } else {
            if(_console.colorCodes.hasOwnProperty(args)){
                escapeSequence += _console.colorCodes[args]
            }
        }
    }
    escapeSequence += '%s '+nonStyleStrings.join(' ');
    escapeSequence += _console.colorReset;

    console.log(escapeSequence,str);
}

// Export object
module.exports = _console;