import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#ff0000',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;