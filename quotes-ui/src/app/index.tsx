import { useState, useEffect, useMemo } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material'
import { Quote } from '../components';
import { QuoteModel } from '../models/quote.models';
import { getQuotes, createQuote, deleteQuote, updateQuote } from '../services/quotes.service';

const App = () => {
  const [newQuote, setNewQuote] = useState<Partial<QuoteModel>>({});
  const [quotes, setQuotes] = useState<Array<QuoteModel>>([]);

  const getAllQuotes = async () => {
    const allQuotes = await getQuotes();
    setQuotes(allQuotes);
  }

  useEffect(() => {
    getAllQuotes();
  }, [])

  const createNewQuote = async () => {
    const quoteRes = await createQuote(newQuote);
    setQuotes((prevValue) => ([...prevValue, quoteRes]))
    setNewQuote({ text: '', author: '' })
  }

  const editQuote = async (payload: QuoteModel) => {
    const { id, ...content } = payload
    await updateQuote(id, content);
    setQuotes(prevValue => {
      const quoteIndex = prevValue.findIndex((i) => i.id === id);

      prevValue.splice(quoteIndex, 1, payload);
      return [...prevValue];
    })
  }

  const deleteSelectedQuote = async (id: string) => {
    await deleteQuote(id);
    setQuotes(prevValue => {
      const quoteIndex = prevValue.findIndex((i) => i.id === id);

      prevValue.splice(quoteIndex, 1);
      return [...prevValue];
    })
  }

  const isValid = useMemo(() => newQuote && (newQuote.author && newQuote.text), [newQuote])

  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box display='flex' justifyContent='center'>
            <Typography variant='h5'>Create New Quote</Typography>
          </Box>
          <Box marginTop={1} display='flex' rowGap={1} flexDirection='column'>
            <TextField size='small' value={newQuote?.text} onChange={e => setNewQuote(prevValue => ({ ...prevValue, text: e.target.value }))} />
            <TextField size='small' value={newQuote?.author} onChange={e => setNewQuote(prevValue => ({ ...prevValue, author: e.target.value }))} />
          </Box>
          <Box display='flex' justifyContent='center' marginTop={1}>
            <Button onClick={createNewQuote} variant='outlined' disabled={!isValid}>Create</Button>
          </Box>
        </Box>
      </Box>
      <Box marginTop={2} display='flex' justifyContent='center'>
        <Typography variant='h5'>Quotes</Typography>
      </Box>
      <Box display='grid' gridTemplateColumns='auto auto auto' gap={4} justifyContent='center'>
        {quotes && quotes.length > 0 &&
          quotes.map(quote => (
            <Quote quote={quote} onEdit={editQuote} onDelete={deleteSelectedQuote} />
          ))
        }
      </Box>

    </Box>
  );
}

export default App;
