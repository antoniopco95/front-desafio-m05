import React, { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarFail({ customMessageReprove, openSnackReprove, setOpenSnackReprove }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackReprove(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSnackReprove} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}>
                <Alert onClose={handleClose} severity="error" sx={{ color: '#AE1100', backgroundColor: '#F2D6D0', width: '100%' }}>
                    {customMessageReprove}
                </Alert>
            </Snackbar>
        </Stack>
    );
}