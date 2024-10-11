import { useEffect, useState } from "react";
import { criarPessoa, listarPessoas } from "../Shared/pessoaF-service";
import { DataTable } from "../Components";
import { IPessoaFisica } from "../utils/interfaces/pessoa-fisica";

export const ConsultarPessoasF = () => {
  const [data, setData] = useState<IPessoaFisica[]>([]);

  const [pNome, setpNome] = useState<String>("");

  useEffect(() => {
    const lP = async () => {
      try {
        const res = await listarPessoas();
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        return;
      }
    };
    lP();
  }, []);

  const criarPf = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      pNome: pNome,
    };

    console.log(body);

    await criarPessoa(body);
  };

  return (
    <>
      <form onSubmit={criarPf}>
        <input
          name="pNome"
          type="text"
          onChange={(event) => setpNome(event?.target.value)}
        />
        <button type="submit">Criar</button>
      </form>

      {<DataTable data={data} />}
    </>
  );
};
