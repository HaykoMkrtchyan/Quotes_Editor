import { QuoteModel } from "../../models/quote.models";

export interface QuoteProps {
    quote: QuoteModel;
    onEdit: (quote: QuoteModel) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}