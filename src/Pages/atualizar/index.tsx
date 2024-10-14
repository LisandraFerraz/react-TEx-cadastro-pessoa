import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  atualizarPessoa,
  buscarEndereco,
  listarPessoa,
} from "../../Shared/pessoaF-service";
import { Pessoa } from "../../utils/classes/pessoa";
import { InputFormPessoa } from "../../Components/form-pessoaF";
import { Select } from "../../Components/select";
import { estadoCivilList } from "../../utils/data/estado-civil";
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
  validaGenero,
  validaNome,
  validaNumero,
  validaProfissao,
  validaRua,
  validaTelefone,
} from "../../utils/functions/validate-form";
import { errorMsg } from "../../utils/functions/get-error";

export const AtualizarPessoa = () => {
  const params = useParams();

  const [data, setData] = useState<Pessoa>(new Pessoa());
  const [oldData, setOldDate] = useState<Pessoa>(new Pessoa());

  useEffect(() => {
    listaPessoaInfo();
  }, [setData]);

  const listaPessoaInfo = async () => {
    const res = await listarPessoa(String(params.id));
    setData(res["data"]["pessoas"][0]);
    setOldDate(res["data"]["pessoas"][0]);

    console.log(res["data"]["pessoas"][0]);
  };

  const alteraCampo = (name: string, value: string) => {
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const buscaEndereco = async (cep: any) => {
    if (cep?.length === 8 && cep.match("^[0-9]*$")) {
      const res = await buscarEndereco(cep);
      const data = res.data;

      setData((oldData) => ({
        ...oldData,
        pBairro: data.bairro,
        pCidade: data.cidade,
        pEstado: data.estado,
        pRua: data.rua,
      }));
    } else {
      console.log("tratamento de erro");
    }
  };

  function formularoVazio(body: any): boolean {
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (body[key] === "" || body[key] === undefined || body[key] === null) {
          return true;
        }
      }
    }
    return false;
  }

  const atualizaDados = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mudancas: Partial<Pessoa> = {};

    for (const key in data) {
      const typedKey = key as keyof Pessoa;
      if (data[typedKey] !== oldData[typedKey])
        mudancas[typedKey] = data[typedKey];
    }

    if (Object.keys(mudancas).length > 0 && !formularoVazio(mudancas)) {
      try {
        await atualizarPessoa(String(params.id), mudancas);
      } catch (error) {
        console.log(errorMsg(error));
      }
      listaPessoaInfo();
    } else {
      console.log("invalido");
      // colocar mensagem de erro
    }
  };

  return (
    <>
      <form
        onSubmit={atualizaDados}
        className="text-defaultWhite grid grid-cols-3 gap-4"
      >
        <div>
          <label htmlFor="pNome">Nome:</label>
          <InputFormPessoa
            iValue={data.pNome}
            setValue={alteraCampo}
            validacao={() => validaNome(data)}
            iName="pNome"
            iId="pNome"
            iType="text"
            iPlaceholder="Insira o nome..."
          />
        </div>
        <div>
          <label htmlFor="pGenero">Genêro:</label>
          <Select
            data={generoLista}
            setValue={alteraCampo}
            validacao={() => validaGenero(data)}
            value="pGenero"
            desc="pGenero"
            sName="pGenero"
            id="id"
          />
        </div>
        <div>
          <label htmlFor="pCpf">pCpf:</label>
          <InputFormPessoa
            iValue={data.pCpf}
            setValue={alteraCampo}
            validacao={() => validaCpf(data)}
            iName="pCpf"
            iId="pCpf"
            iType="text"
            iPlaceholder="000.000.000-00"
          />
        </div>
        <div>
          <label htmlFor="pDataNasc">Data Nasc.:</label>
          <InputFormPessoa
            iValue={data.pDataNasc}
            setValue={alteraCampo}
            validacao={() => validaDataNasc(data)}
            iName="pDataNasc"
            iId="pDataNasc"
            iType="date"
          />
        </div>
        <div>
          <label htmlFor="pCep">CEP:</label>
          <InputFormPessoa
            iValue={data.pCep}
            setValue={alteraCampo}
            setBlur={buscaEndereco}
            validacao={() => validaCep(data)}
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
            iValue={data.pCidade}
            setValue={alteraCampo}
            validacao={() => validaCidade(data)}
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
            iValue={data.pEstado}
            setValue={alteraCampo}
            validacao={() => validaEstado(data)}
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
            iValue={data.pBairro}
            setValue={alteraCampo}
            validacao={() => validaBairro(data)}
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
            iValue={data.pRua}
            setValue={alteraCampo}
            validacao={() => validaRua(data)}
            iName="pRua"
            iId="pRua"
            iType="text"
            iPlaceholder="Informe a rua"
          />
        </div>
        <div>
          <label htmlFor="pNumero">Número:</label>
          <InputFormPessoa
            iValue={data.pNumero}
            setValue={alteraCampo}
            validacao={() => validaNumero(data)}
            iName="pNumero"
            iId="pNumero"
            iType="text"
            iPlaceholder="Informe a rua"
          />
        </div>
        <div>
          <label htmlFor="pComplemento">Complemento:</label>
          <InputFormPessoa
            iValue={data.pComplemento}
            validacao={() => validaComplemento(data)}
            setValue={alteraCampo}
            iName="pComplemento"
            iId="pComplemento"
            iType="text"
            iPlaceholder="Informe o complemento"
          />
        </div>
        <div>
          <label htmlFor="pEmail">E-mail:</label>
          <InputFormPessoa
            iValue={data.pEmail}
            setValue={alteraCampo}
            validacao={() => validaEmail(data)}
            iName="pEmail"
            iId="pEmail"
            iType="text"
            iPlaceholder="Informe o email"
          />
        </div>
        <div>
          <label htmlFor="pTelefone">Telefone:</label>
          <InputFormPessoa
            iValue={data.pTelefone}
            setValue={alteraCampo}
            validacao={() => validaTelefone(data)}
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
            setValue={alteraCampo}
            validacao={() => validaEstadoCivil(data)}
            value="pEstadoCivil"
            desc="pEstadoCivil"
            sName="pEstadoCivil"
            id="id"
          />
        </div>
        <div>
          <label htmlFor="pProfissao">Profissão:</label>
          <InputFormPessoa
            iValue={data.pProfissao}
            setValue={alteraCampo}
            validacao={() => validaProfissao(data)}
            iName="pProfissao"
            iId="pProfissao"
            iType="text"
            iPlaceholder="Informe a profissão"
          />
        </div>
        <div>
          <button onClick={() => console.log(data)}>CRIAR</button>
        </div>
      </form>
    </>
  );
};
