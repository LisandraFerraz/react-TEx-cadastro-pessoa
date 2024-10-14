import { Pessoa } from "../classes/pessoa";
import { validaDate } from "./get-date";

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

export function validaNome(body: Pessoa): string {
  if (!body.pNome || body.pNome.length < 3) {
    const errorMsg = "Nome deve ter mais de 3 caracteres.";
    return errorMsg;
  }
  return "";
}

export function validaCpf(body: Pessoa): string {
  if (body.pCpf.length !== 10 || !body.pCpf.match("^[0-9]*$")) {
    const errorMsg = "CPF deve ter 11 caracteres numéricos.";
    return errorMsg;
  }
  return "";
}

export function validaEmail(body: Pessoa): string {
  if (!body.pEmail || !body.pEmail.match(emailRegex)) {
    const errorMsg = "Informe um email válido.";
    return errorMsg;
  }
  return "";
}

export function validaGenero(body: Pessoa): string {
  if (!body.pGenero || body.pGenero === "Selecione") {
    const errorMsg = "Campo obrigatório.";
    return errorMsg;
  }
  return "";
}

export function validaDataNasc(body: Pessoa): string {
  if (!body.pDataNasc || validaDate(body.pDataNasc)) {
    const errorMsg = "Data deve ser menor que o dia atual.";
    return errorMsg;
  }
  return "";
}

export function validaTelefone(body: Pessoa): string {
  if (!body.pTelefone || body.pTelefone.length !== 10) {
    const errorMsg = "Telefone deve ter entre 11 e 12 caracteres.";
    return errorMsg;
  }
  return "";
}

export function validaCep(body: Pessoa): string {
  if (
    !body.pCep ||
    (body.pCep.length !== 7 && !body.pEmail.match(emailRegex))
  ) {
    const errorMsg = "CEP deve ter 8 caractéres numéricos.";
    return errorMsg;
  }
  return "";
}

export function validaCidade(body: Pessoa): string {
  if (!body.pCidade || body.pCidade.length < 3) {
    const errorMsg = "Informe uma cidade válida.";
    return errorMsg;
  }
  return "";
}

export function validaEstado(body: Pessoa): string {
  if (!body.pEstado || body.pEstado.length < 2) {
    const errorMsg = "Informe um estado válida.";
    return errorMsg;
  }
  return "";
}

export function validaBairro(body: Pessoa): string {
  if (!body.pBairro || body.pBairro.length < 2) {
    const errorMsg = "Informe um bairro válida.";
    return errorMsg;
  }
  return "";
}

export function validaRua(body: Pessoa): string {
  if (!body.pRua || body.pRua.length < 2) {
    const errorMsg = "Informe uma rua válida.";
    return errorMsg;
  }
  return "";
}

export function validaNumero(body: Pessoa): string {
  if (!body.pNumero || !body.pNumero.match("^[0-9]*$")) {
    const errorMsg = "Informe um número válido.";
    return errorMsg;
  }
  return "";
}

export function validaComplemento(body: Pessoa): string {
  if (body.pComplemento && body.pComplemento.length < 1) {
    const errorMsg = "Informe um complemento válido.";
    return errorMsg;
  }
  return "";
}

export function validaEstadoCivil(body: Pessoa): string {
  if (!body.pEstadoCivil || body.pEstadoCivil === "Selecione") {
    const errorMsg = "Campo obrigatório.";
    return errorMsg;
  }
  return "";
}

export function validaProfissao(body: Pessoa): string {
  if (!body.pProfissao.length || body.pProfissao.length < 1) {
    const errorMsg = "Campo obrigatório.";
    return errorMsg;
  }
  return "";
}
