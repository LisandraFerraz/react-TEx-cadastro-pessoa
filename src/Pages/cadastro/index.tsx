import { useState } from "react";
import { Select } from "../../Components/select";
import { buscarEndereco, criarPessoa } from "../../Shared/pessoaF-service";
import { estadoCivilList } from "../../utils/data/estado-civil";
import { InputFormPessoa } from "../../Components/form-pessoaF";
import { Pessoa } from "../../utils/classes/pessoa";
import { generoLista } from "../../utils/data/genero";
import {
  validaBairro,
  validaCep,
  validaCidade,
  validaComplemento,
  validaCpf,
  validaDataNasc,
  validaEmail,
  validaEstado,
  validaEstadoCivil,
  validaNome,
  validaNumero,
  validaProfissao,
  validaRua,
  validaTelefone,
} from "../../utils/functions/validate-form";
import { errorMsg } from "../../utils/functions/get-error";
import { Header } from "../../Components/header";

export const CadastroPessoa = () => {
  const [body, setBody] = useState<Pessoa>(new Pessoa());

  const buscaEndereco = async (cep: any) => {
    if (cep.length && cep.match("^[0-9]*$")) {
      try {
        const res = await buscarEndereco(cep);
        const data = res.data;

        setBody((oldData) => ({
          ...oldData,
          pBairro: data.bairro,
          pCidade: data.cidade,
          pEstado: data.estado,
          pRua: data.rua,
        }));
      } catch (error) {
        console.error(errorMsg(error));
      }
    }
  };

  const atualizaBodyProp = (name: string, value: string) => {
    setBody((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  // verifica se campos obrigatórios estão preenchidos
  function formularoVazio() {
    const formValues = {};

    Object.assign(formValues, {
      pNome: body.pNome,
      pCpf: body.pCpf,
      pGenero: body.pGenero,
      pDataNasc: body.pDataNasc,
      pTelefone: body.pTelefone,
      pCidade: body.pCidade,
      pEstado: body.pEstado,
      pBairro: body.pBairro,
      pRua: body.pRua,
      pNumero: body.pNumero,
      pEmail: body.pEmail,
      pEstadoCivil: body.pEstadoCivil,
      pProfissao: body.pProfissao,
    });

    return Object.values(formValues).some(
      (val) => val === "" || val === undefined || val == null
    );
  }

  const criarPf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formularoVazio()) {
      try {
        await criarPessoa(body);
        window.alert("Cadastro efetuado!");
      } catch (error: any) {
        console.error(errorMsg(error));
      }
    }
  };

  return (
    <>
      <Header titulo={"Cadastrar Pessoa Física"} />
      <div className="container">
        <form onSubmit={criarPf} id="cadastro-pessoa">
          <div className="text-defaultWhite grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <div>
              <label htmlFor="pNome">Nome:</label>
              <InputFormPessoa
                iValue={body.pNome}
                setValue={atualizaBodyProp}
                validacao={() => validaNome(body)}
                iName="pNome"
                iId="pNome"
                iType="text"
                iPlaceholder="Insira o nome"
              />
            </div>
            <div>
              <label htmlFor="pGenero">Gênero:</label>
              <Select
                data={generoLista}
                setValue={atualizaBodyProp}
                value="pGenero"
                desc="pGenero"
                sName="pGenero"
                id="id"
              />
            </div>
            <div>
              <label htmlFor="pCpf">cpf:</label>
              <InputFormPessoa
                iValue={body.pCpf}
                setValue={atualizaBodyProp}
                validacao={() => validaCpf(body)}
                iName="pCpf"
                iId="pCpf"
                iType="text"
                iPlaceholder="000.000.000-00"
              />
            </div>
            <div>
              <label htmlFor="pDataNasc">Data Nasc.:</label>
              <InputFormPessoa
                iValue={body.pDataNasc}
                setValue={atualizaBodyProp}
                validacao={() => validaDataNasc(body)}
                iName="pDataNasc"
                iId="pDataNasc"
                iType="date"
              />
            </div>
            <div>
              <label htmlFor="pCep">CEP:</label>
              <InputFormPessoa
                iValue={body.pCep}
                setValue={atualizaBodyProp}
                setBlur={buscaEndereco}
                validacao={() => validaCep(body)}
                iName="pCep"
                iId="pCep"
                iType="text"
                iPlaceholder="0000-000"
              />
            </div>
            <div>
              {/* deixar nao editavel */}
              <label htmlFor="pCidade">Cidade:</label>
              <InputFormPessoa
                disabled={true}
                iValue={body.pCidade}
                setValue={atualizaBodyProp}
                validacao={() => validaCidade(body)}
                iName="pCidade"
                iId="pCidade"
                iType="text"
                iPlaceholder="Informe a cidade"
              />
            </div>
            <div>
              {/* deixar nao editavel */}
              <label htmlFor="pEstado">Estado:</label>
              <InputFormPessoa
                disabled={true}
                iValue={body.pEstado}
                setValue={atualizaBodyProp}
                validacao={() => validaEstado(body)}
                iName="pEstado"
                iId="pEstado"
                iType="text"
                iPlaceholder="Informe o estado"
              />
            </div>
            <div>
              {/* deixar nao editavel */}
              <label htmlFor="pBairro">Bairro:</label>
              <InputFormPessoa
                disabled={true}
                iValue={body.pBairro}
                setValue={atualizaBodyProp}
                validacao={() => validaBairro(body)}
                iName="pBairro"
                iId="pBairro"
                iType="text"
                iPlaceholder="Informe o bairro"
              />
            </div>
            <div>
              {/* deixar nao editavel */}
              <label htmlFor="pRua">Rua:</label>
              <InputFormPessoa
                disabled={true}
                iValue={body.pRua}
                setValue={atualizaBodyProp}
                validacao={() => validaRua(body)}
                iName="pRua"
                iId="pRua"
                iType="text"
                iPlaceholder="Informe a rua"
              />
            </div>
            <div>
              <label htmlFor="pNumero">Número:</label>
              <InputFormPessoa
                iValue={body.pNumero}
                setValue={atualizaBodyProp}
                validacao={() => validaNumero(body)}
                iName="pNumero"
                iId="pNumero"
                iType="text"
                iPlaceholder="Informe o número"
              />
            </div>
            <div>
              <label htmlFor="pComplemento">Complemento (opcional):</label>
              <InputFormPessoa
                iValue={body.pComplemento}
                validacao={() => validaComplemento(body)}
                setValue={atualizaBodyProp}
                iName="pComplemento"
                iId="pComplemento"
                iType="text"
                iPlaceholder="Informe o complemento"
              />
            </div>
            <div>
              <label htmlFor="pEmail">E-mail:</label>
              <InputFormPessoa
                iValue={body.pEmail}
                setValue={atualizaBodyProp}
                validacao={() => validaEmail(body)}
                iName="pEmail"
                iId="pEmail"
                iType="text"
                iPlaceholder="Informe o email"
              />
            </div>
            <div>
              <label htmlFor="pTelefone">Telefone:</label>
              <InputFormPessoa
                iValue={body.pTelefone}
                setValue={atualizaBodyProp}
                validacao={() => validaTelefone(body)}
                iName="pTelefone"
                iId="pTelefone"
                iType="text"
                iPlaceholder="(00) 0000-0000"
              />
            </div>
            <div>
              <label htmlFor="pEstadoCivil">Estado Civil:</label>
              <Select
                data={estadoCivilList}
                setValue={atualizaBodyProp}
                validacao={() => validaEstadoCivil(body)}
                value="pEstadoCivil"
                desc="pEstadoCivil"
                sName="pEstadoCivil"
                id="id"
              />
            </div>
            <div>
              <label htmlFor="pProfissao">Profissão:</label>
              <InputFormPessoa
                iValue={body.pProfissao}
                setValue={atualizaBodyProp}
                validacao={() => validaProfissao(body)}
                iName="pProfissao"
                iId="pProfissao"
                iType="text"
                iPlaceholder="Informe a profissão"
              />
            </div>
          </div>
          <div className="mt-7 w-full text-center flex flex-col gap-2 items-center">
            <button type="submit" className="custom-btn-lg">
              CRIAR
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
