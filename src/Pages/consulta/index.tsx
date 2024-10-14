import { useEffect, useState } from "react";
import {
  listarComboPessoas,
  listarPessoa,
  listarPessoas,
} from "../../Shared/pessoaF-service";
import { DataTable } from "../../Components/table";
import { IPessoaFisica } from "../../utils/interfaces/pessoa-fisica";
import { FiltrosListagem } from "../../utils/classes/filtros-listar";
import { IPagination } from "../../utils/interfaces/pagination";
import { Pagination } from "../../Components/pagination";
import { Select } from "../../Components/select";
import { useNavigate } from "react-router-dom";

export const ConsultarPessoasF = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState(() => new FiltrosListagem());
  const [data, setData] = useState<IPessoaFisica[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>();

  const [listaPessoas, setListaPessoas] = useState<any[]>([]);
  const [pNome, setpNome] = useState<string>("");

  useEffect(() => {
    listarComboP();
  }, []);

  useEffect(() => {
    listarData(filtros.page);
  }, [filtros]);

  const listarComboP = async () => {
    try {
      const res = await listarComboPessoas();
      setListaPessoas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarData = async (page: number) => {
    try {
      console.log("filtros |", filtros);

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

  const listaCombo = async (id: string) => {
    try {
      const res = await listarPessoa(id);
      setData(res.data["pessoas"]);
      setPagination(res.data["paginacao"]);
    } catch (error) {}
  };

  const pesquisarPessoa = async () => {
    setFiltros((oldFiltros) => ({ ...oldFiltros, pNome: pNome }));
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
      <input
        name="pNome"
        type="text"
        placeholder="Pesquisar nome..."
        onChange={(event) => setpNome(event?.target.value)}
      />
      <button onClick={pesquisarPessoa}>Pesquisar</button>

      {pagination && (
        <div>
          <Select
            setValue={(id) => listaCombo(id)}
            desc="pNome"
            id="_id"
            value=""
            data={listaPessoas}
            sName="pNome"
          />
          <DataTable
            data={data}
            paginacao={pagination}
            onDelete={() => listarData(1)}
          />
          <div className="flex flex-row justify-between items-center w-full">
            <button
              onClick={() => navigate("/cadastro-pessoa")}
              className="squareBtn text-2xl bg-gradient-to-l from-pastelPink to-pastelBlue"
            >
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
