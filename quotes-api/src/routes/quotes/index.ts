import { Router, Request, Response } from 'express';
import { Quote } from '../../models';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const quotes = await Quote.find();

  return res.send(quotes);
});

router.post('/', async (req: Request, res: Response) => {
  const { text, author } = req.body;
  
  const quote = new Quote({ author, text });
  await quote.save();

  return res.status(201).send(quote);
});

router.put('/:id', async (req: Request, res: Response) => {
  const { text, author } = req.body;
  const id = req.params.id;

  await Quote.findByIdAndUpdate(id, { author, text });
  return res.status(200).send(); 
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  await Quote.findByIdAndDelete(id);
  return res.status(200).send();
});


export { router as quotesRouter };
