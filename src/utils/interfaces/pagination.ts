export interface IPagination {
  totalItems: number;
  itemsPagina: number;
  paginaAtual: number;
  nextPage: (page: number) => void;
}
