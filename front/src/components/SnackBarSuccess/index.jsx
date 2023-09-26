import React, { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarSuccess({ customMessageApprove, openSnackApprove, setOpenSnackApprove }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackApprove(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSnackApprove} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}>
                <Alert onClose={handleClose} severity="success" sx={{ color: '#243F80', backgroundColor: '#C3D4FE', width: '100%' }}>
                    {customMessageApprove}
                </Alert>
            </Snackbar>
        </Stack>
    );
}