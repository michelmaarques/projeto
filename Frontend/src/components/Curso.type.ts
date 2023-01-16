export interface ICurso {
    id: string;
    nome: string;
    descricao: string;
    vagas: number;
    modelo: string;
}

export enum PageEnum {
    list,
    add,
    edit
}