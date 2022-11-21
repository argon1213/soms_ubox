import { styled } from '@mui/material/styles';
import {FormControlLabel} from '@mui/material';

const CssFormControlLabel = styled(FormControlLabel)({
    '& .MuiFormControlLabel-label': {
        fontSize: 16,
    },
});

export default CssFormControlLabel;