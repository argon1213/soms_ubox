import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';

const CustomColorRadio = styled(Radio)({
    color: "#FFBE3D",
    
    '&.Mui-checked': {
        color: "#FFBE3D",
    },
    '& .css-1hbvpl3-MuiSvgIcon-root': {
        fontSize: 22,
    },
    '& .css-11zohuh-MuiSvgIcon-root': {
        fontSize: 22,
    }
});

export default CustomColorRadio;