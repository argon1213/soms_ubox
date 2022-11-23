import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
    color: '#FFBE3D',

    '& input': {
        fontSize: 16,
    },
    '& div': {
        fontSize: 16,
    },
    '& label': {
        color: '#FFBE3D',
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: 16,
    },
    '& label.Mui-focused': {
        color: '#FFBE3D',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#FFBE3D',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#FFBE3D',
    },
    '& .MuiInput-root': {
        '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #FFBE3D',
        },
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFBE3D',
        },
        '&:hover fieldset': {
            borderColor: '#FFBE3D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFBE3D',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFBE3D',
        },
    },
});

export default CssTextField;