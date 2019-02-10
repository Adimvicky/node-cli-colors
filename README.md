# node-cli-colors

Looking at white logs on your console can be really confusing and boring at the same time.
Level up your CLI game by printing colored text, with background colors and some text formatting to your nodejs console using node-cli-colors!


![Example Logs using node-cli-colors](./node-cli-colors.png)

## API

```javascript
// Import the module
const _console = require('node-cli-colors');

// You can apply single styles using _console.{styleName}()
_console.yellow('This text will be logged in yellow');
_console.underline('This text will be underlined');
_console.bgBlue('This text will have a blue background color');

// You can combine styles using _console.log('your awesome text',['an','array','of','styles'])
_console.log('This text will have a white background,red text color and an underline',['bgWhite','red','underline']);
```

### Available styles / colors :

*styles beginning with a 'bg' are background colors*

    > black
    > bgBlack
    > red
    > bgRed
    > green
    > bgGreen
    >  yellow
    > bgYellow
    > blue
    > bgBlue
    > magenta
    > bgMagenta
    > cyan
    > bgCyan
    > white
    > bgWhite
    > underline


