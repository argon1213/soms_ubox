import { styled } from '@mui/material/styles';
import {MenuItem} from '@mui/material';

const CssMenuItem = styled(MenuItem)({
    fontSize: '16px',

    '& input': {
        fontSize: 16,
    },
    '& div': {
        fonSize: 16,
    }
});

export default CssMenuItem;