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

  const atualizaDados = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mudancas: Partial<Pessoa> = {};

    for (const key in data) {
      const typedKey = key as keyof Pessoa;
      if (data[typedKey] !== oldData[typedKey])
        mudancas[typedKey] = data[typedKey];
    }

    if (Object.keys(mudancas).length > 0) {
      await atualizarPessoa(String(params.id), mudancas);
      listaPessoaInfo();
    }
  };

  return (
    <>
      <form onSubmit={atualizaDados}>
        <div>
          <label htmlFor="pNome">Nome:</label>
          <InputFormPessoa
            iValue={data.pNome}
            setValue={alteraCampo}
            iName="pNome"
            iId="pNome"
            iType="text"
            iPlaceholder="Insira o nome..."
          />
        </div>
        <div>
          <label htmlFor="pCpf">pCpf:</label>
          <InputFormPessoa
            iValue={data.pCpf}
            setValue={alteraCampo}
            iName="pCpf"
            iId="pCpf"
            iType="text"
            iPlaceholder="000.000.000-00"
          />
        </div>
        <div>
          <label htmlFor="pDataNasc">Data Nasc.:</label>
          <label htmlFor="pCpf">pCpf:</label>
          <InputFormPessoa
            iValue={data.pDataNasc}
            setValue={alteraCampo}
            iName="pDataNasc"
            iId="pDataNasc"
            iType="date"
            iPlaceholder="000.000.000-00"
          />
        </div>
        <div>
          <label htmlFor="pTelefone">Telefone:</label>
          <InputFormPessoa
            iValue={data.pTelefone}
            setValue={alteraCampo}
            iName="pTelefone"
            iId="pTelefone"
            iType="text"
            iPlaceholder="(00) 0000-0000"
          />
        </div>
        <div>
          <label htmlFor="pCep">CEP:</label>
          <InputFormPessoa
            iValue={data.pCep}
            setValue={alteraCampo}
            setBlur={buscaEndereco}
            iName="pCep"
            iId="pCep"
            iType="text"
            iPlaceholder="0000-000"
          />

          {/* <input
            className="text-bgDark"
            name="pCidade"
            id="pCidade"
            type="text"
            value={cep}
            onChange={(e) => {
              setCep(Number(e.currentTarget.value));
            }}
            onBlur={(e) => buscaEndereco(e.currentTarget.value)}
            placeholder="Insira o nome..."/> */}
        </div>
        <div>
          {/* deixar nao editavel */}
          <label htmlFor="pCidade">Cidade:</label>
          <InputFormPessoa
            iValue={data.pCidade}
            setValue={alteraCampo}
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
            iValue={data.pEstado}
            setValue={alteraCampo}
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
            iValue={data.pBairro}
            setValue={alteraCampo}
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
            iValue={data.pRua}
            setValue={alteraCampo}
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
            iName="pEmail"
            iId="pEmail"
            iType="email"
            iPlaceholder="Informe o email"
          />
        </div>
        <div>
          <label htmlFor="pEstadoCivil">Estado Civil:</label>
          <Select
            data={estadoCivilList}
            setValue={alteraCampo}
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
