export enum EstadoCivil {
  SOLTEIRO = "Solteiro(a)",
  CASADO = "Casado(a)",
  VIÚVO = "Viúvo(a)",
  DIVORCIADO = "Divorciado(a)",
  UESTAVEL = "União Estável",
}

export interface IPessoaFisica {
  _id: string;
  pNome: string;
  pCpf: number;
  pDataNasc: string;
  pTelefone: number;
  pCidade: string;
  pEstado: string;
  pBairro: string;
  pRua: string;
  pNumero: string;
  pComplemento: string;
  pEmail: string;
  pEstadoCivil: EstadoCivil;
  pProfissao: string;

  onPageChange: (page: number) => void;
}
