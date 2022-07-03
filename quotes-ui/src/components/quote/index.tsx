import { useState } from "react"
import { Buttons } from "../buttons"
import { Box, Card, CardContent, Typography, TextField, CardActions, Button } from '@mui/material'
import { QuoteProps } from "./types";
import { QuoteModel } from "../../models/quote.models";

export const Quote = (props: QuoteProps): JSX.Element => {
    const { quote: { text, author, id }, onDelete, onEdit } = props;
    const [hovering, setHovering] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [quotePayload, setQuotePayload] = useState<QuoteModel>(props.quote)

    return (
        <Box onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} display='flex' flexDirection='column' rowGap={1}>
            <Card sx={{ minWidth: 345 }}>
                <CardContent>
                    {isEditing ?
                        <Box display='flex' columnGap={1}>
                            <TextField
                                label='Quote'
                                size='small'
                                value={quotePayload.text}
                                onChange={(e) => setQuotePayload(prevValue => ({ ...prevValue, text: e.target.value }))}
                            />
                            <TextField
                                label='Author'
                                size='small'
                                value={quotePayload.author}
                                onChange={(e) => setQuotePayload(prevValue => ({ ...prevValue, author: e.target.value }))}
                            />
                        </Box>
                        :
                        <>
                            <Typography>{text}</Typography>
                            <Typography>{author}</Typography>
                        </>
                    }
                </CardContent>
                {isEditing && <CardActions>
                    <Button onClick={() => { onEdit(quotePayload); setIsEditing(false) }}>Save</Button>
                    <Button onClick={() => {
                        setQuotePayload(props.quote)
                        setIsEditing(false)
                    }}>Cancel</Button>
                </CardActions>}
            </Card>
            {(!isEditing && hovering) && <Buttons onEdit={() => setIsEditing(true)} onDelete={() => onDelete(id)} />}
        </Box>

    )
}