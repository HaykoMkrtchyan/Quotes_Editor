import { Box, Button } from '@mui/material';
import { ButtonsProps } from './types';

export const Buttons = (props: ButtonsProps) => {
    const { onEdit, onDelete } = props;
    return (
        <Box display='flex' columnGap={1}>
            <Button onClick={onEdit} variant='outlined'>Edit</Button>
            <Button onClick={onDelete} variant='outlined'>Delete</Button>
        </Box>
    )
}