import { useState } from "react";
import { Select } from "../../Components/select";
import { buscarEndereco, criarPessoa } from "../../Shared/pessoaF-service";
import { estadoCivilList } from "../../utils/data/estado-civil";

export const CadastroPessoa = ({ props }: any) => {
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<number>(0);
  const [dataNasc, setDataNasc] = useState<string>("");
  const [telefone, setTelefone] = useState<number>(0);
  const [cep, setCep] = useState<number>(0);
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<number>(0);
  const [complemento, setComplemento] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // add interface
  const [estadoCivil, setEstadoCivil] = useState<string>("");
  const [profissao, setProfissao] = useState<string>("");

  const buscaEndereco = async (cep: any) => {
    if (cep.length === 8) {
      const res = await buscarEndereco(cep);
      const data = res.data;

      setBairro(data.bairro);
      setCidade(data.cidade);
      setEstado(data.estado);
      setRua(data.rua);
    }
  };

  const criarPf = async () => {
    const body = {
      pNome: nome,
      pCpf: cpf,
      pDataNasc: dataNasc,
      pTelefone: telefone,
      pCep: cep,
      pCidade: cidade,
      pEstado: estado,
      pBairro: bairro,
      pRua: rua,
      pNumero: numero,
      pComplemento: complemento,
      pEmail: email,
      pEstadoCivil: estadoCivil,
      pProfissao: profissao,
    };
    console.log(body);
    await criarPessoa(body);
  };

  return (
    <>
      <div
        id="cadastro-pessoa"
        className="text-defaultWhite grid grid-cols-3 gap-4"
      >
        <div>
          <label htmlFor="pNome">Nome:</label>
          <input
            className="text-bgDark"
            name="pNome"
            id="pNome"
            type="text"
            placeholder="Insira o nome..."
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pCpf">pCpf:</label>
          <input
            className="text-bgDark"
            name="pCpf"
            id="pCpf"
            type="text"
            placeholder="Insira o nome..."
            value={cpf}
            onChange={(e) => setCpf(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="pDataNasc">Data Nasc.:</label>
          <input
            className="text-bgDark"
            name="pDataNasc"
            id="pDataNasc"
            type="date"
            placeholder="Insira o nome..."
            value={dataNasc}
            onChange={(e) => setDataNasc(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pTelefone">Telefone:</label>
          <input
            className="text-bgDark"
            name="pTelefone"
            id="pTelefone"
            type="text"
            placeholder="Insira o nome..."
            value={telefone}
            onChange={(e) => setTelefone(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="pCidade">CEP:</label>
          <input
            className="text-bgDark"
            name="pCidade"
            id="pCidade"
            type="text"
            value={cep}
            onChange={(e) => {
              setCep(Number(e.currentTarget.value));
            }}
            onBlur={(e) => buscaEndereco(e.currentTarget.value)}
            placeholder="Insira o nome..."
          />
        </div>
        <div>
          <label htmlFor="pCidade">Cidade:</label>
          <input
            className="text-bgDark"
            name="pCidade"
            id="pCidade"
            type="text"
            placeholder="Insira o nome..."
            value={cidade}
            onChange={(e) => setCidade(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pEstado">Estado:</label>
          <input
            className="text-bgDark"
            name="pEstado"
            id="pEstado"
            type="text"
            placeholder="Insira o nome..."
            value={estado}
            onChange={(e) => setEstado(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pBairro">Bairro:</label>
          <input
            className="text-bgDark"
            name="pBairro"
            id="pBairro"
            type="text"
            placeholder="Insira o nome..."
            value={bairro}
            onChange={(e) => setBairro(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pRua">Rua:</label>
          <input
            className="text-bgDark"
            name="pRua"
            id="pRua"
            type="text"
            placeholder="Insira o nome..."
            value={rua}
            onChange={(e) => setRua(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pNumero">Número:</label>
          <input
            className="text-bgDark"
            name="pNumero"
            id="pNumero"
            type="text"
            placeholder="Insira o nome..."
            value={numero}
            onChange={(e) => setNumero(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="pComplemento">Complemento:</label>
          <input
            className="text-bgDark"
            name="pComplemento"
            id="pComplemento"
            type="text"
            placeholder="Insira o nome..."
            value={complemento}
            onChange={(e) => setComplemento(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pEmail">E-mail:</label>
          <input
            className="text-bgDark"
            name="pEmail"
            id="pEmail"
            type="email"
            placeholder="Insira o nome..."
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="pEstadoCivil">Estado Civil:</label>
          <Select
            data={estadoCivilList}
            setValue={(e) => setEstadoCivil(e)}
            value="value"
            desc="value"
            id="id"
          />
        </div>
        <div>
          <label htmlFor="pProfissao">Profissão:</label>
          <input
            className="text-bgDark"
            name="pProfissao"
            id="pProfissao"
            type="text"
            placeholder="Insira o nome..."
            value={profissao}
            onChange={(e) => setProfissao(e.currentTarget.value)}
          />
        </div>
        <div>
          <button onClick={criarPf}>CRIAR</button>
        </div>
      </div>
    </>
  );
};
