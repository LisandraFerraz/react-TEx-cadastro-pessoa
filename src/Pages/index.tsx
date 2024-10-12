import { useEffect, useState } from "react";
import {
  criarPessoa,
  deletarPessoa,
  listarPessoas,
} from "../Shared/pessoaF-service";
import { DataTable } from "../Components/table";
import { IPessoaFisica } from "../utils/interfaces/pessoa-fisica";
import { FiltrosListagem } from "../utils/interfaces/filtros-listar";
import { IPagination } from "../utils/interfaces/pagination";
import { Pagination } from "../Components/pagination";

export const ConsultarPessoasF = () => {
  const [filtros] = useState(() => new FiltrosListagem());
  const [data, setData] = useState<IPessoaFisica[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  // const [pNome, setpNome] = useState<String>("");

  useEffect(() => {
    listarData(1);
  }, []);

  const listarData = async (page: number) => {
    try {
      filtros.page = page;
      const res = await listarPessoas(filtros);
      setData(res.data["pessoas"]);
      setPagination(res.data["paginacao"]);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  };

  // const criarPf = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const body = {
  //     pNome: pNome,
  //   };
  //   await criarPessoa(body);
  // };

  return (
    <>
      {/* <form onSubmit={criarPf}>
        <input
          name="pNome"
          type="text"
          onChange={(event) => setpNome(event?.target.value)}
        />
        <button type="submit">Criar</button>
      </form> */}

      {pagination && (
        <div>
          <DataTable
            data={data}
            paginacao={pagination}
            onDelete={() => listarData(1)}
          />
          <div className="flex flex-row justify-between items-center w-full">
            <button className="squareBtn bg-gradient-to-l from-pastelPink to-pastelBlue">
              +
            </button>
            <Pagination
              nextPage={(page) => listarData(page)}
              totalItems={pagination.totalItems}
              paginaAtual={pagination.paginaAtual}
              itemsPagina={pagination.itemsPagina}
            />
          </div>
        </div>
      )}
    </>
  );
};
