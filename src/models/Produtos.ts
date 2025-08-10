import {Categoria} from './Categoria';


export default interface Produto{
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    descricao?: string;
    categoria?: string;
    imagemUrl?: string;
}