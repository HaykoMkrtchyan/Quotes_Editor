import axios from "axios";
import { QuoteModel } from "../models/quote.models";

const API_URL = process.env.API_URL || 'http://localhost:8080/';
axios.defaults.baseURL = API_URL;

export const getQuotes = async (): Promise<Array<QuoteModel>> => {
    const res = await axios.get('quotes');
    return res.data;
}

export const createQuote = async (quote: Partial<QuoteModel>): Promise<QuoteModel> => {
    const res = await axios.post(`quotes`, quote);
    return res.data;
}

export const updateQuote = async (id: string, quote: Partial<QuoteModel>): Promise<void> => {
    await axios.put(`quotes/${id}`, quote)
}

export const deleteQuote = async (id: string): Promise<void> => {
    await axios.delete(`quotes/${id}`);
}
