import { useState } from "react";
import { Select } from "../../Components/select";
import { buscarEndereco, criarPessoa } from "../../Shared/pessoaF-service";
import { estadoCivilList } from "../../utils/data/estado-civil";
import { InputFormPessoa } from "../../Components/form-pessoaF";
import { Pessoa } from "../../utils/classes/pessoa";

export const CadastroPessoa = () => {
  const [body, setBody] = useState<Pessoa>(new Pessoa());

  const buscaEndereco = async (cep: any) => {
    if (cep.length === 8 && cep.match("^[0-9]*$")) {
      const res = await buscarEndereco(cep);
      const data = res.data;

      setBody((oldData) => ({
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

  const criarPf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await criarPessoa(body);
  };

  const atualizaBodyProp = (name: string, value: string) => {
    setBody((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={criarPf}
        id="cadastro-pessoa"
        className="text-defaultWhite grid grid-cols-3 gap-4"
      >
        <div>
          <label htmlFor="pNome">Nome:</label>

          <InputFormPessoa
            iValue={body.pNome}
            setValue={atualizaBodyProp}
            iName="pNome"
            iId="pNome"
            iType="text"
            iPlaceholder="Insira o nome..."
          />
        </div>
        <div>
          <label htmlFor="pCpf">pCpf:</label>
          <InputFormPessoa
            iValue={body.pCpf}
            setValue={atualizaBodyProp}
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
            iValue={body.pDataNasc}
            setValue={atualizaBodyProp}
            iName="pDataNasc"
            iId="pDataNasc"
            iType="date"
            iPlaceholder="000.000.000-00"
          />
        </div>
        <div>
          <label htmlFor="pTelefone">Telefone:</label>
          <InputFormPessoa
            iValue={body.pTelefone}
            setValue={atualizaBodyProp}
            iName="pTelefone"
            iId="pTelefone"
            iType="text"
            iPlaceholder="(00) 0000-0000"
          />
        </div>
        <div>
          <label htmlFor="pCep">CEP:</label>
          <InputFormPessoa
            iValue={body.pCep}
            setValue={atualizaBodyProp}
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
            iValue={body.pCidade}
            setValue={atualizaBodyProp}
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
            iValue={body.pEstado}
            setValue={atualizaBodyProp}
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
            iValue={body.pBairro}
            setValue={atualizaBodyProp}
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
            iValue={body.pRua}
            setValue={atualizaBodyProp}
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
            iName="pNumero"
            iId="pNumero"
            iType="text"
            iPlaceholder="Informe a rua"
          />
        </div>
        <div>
          <label htmlFor="pComplemento">Complemento:</label>
          <InputFormPessoa
            iValue={body.pComplemento}
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
            setValue={atualizaBodyProp}
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
            iName="pProfissao"
            iId="pProfissao"
            iType="text"
            iPlaceholder="Informe a profissão"
          />
        </div>
        <div>
          <button onClick={() => console.log(body)}>CRIAR</button>
        </div>
      </form>
    </>
  );
};
