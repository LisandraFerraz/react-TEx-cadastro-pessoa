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
import { Header } from "../../Components/header";
import { errorMsg } from "../../utils/functions/get-error";

interface ListaPessoas {
  pNome: string;
  _id: string;
}

export const ConsultarPessoasF = () => {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState(() => new FiltrosListagem());
  const [data, setData] = useState<IPessoaFisica[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>();

  const [listaPessoas, setListaPessoas] = useState<ListaPessoas[]>([]);
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
      console.error(errorMsg(error));
    }
  };

  const listarData = async (page: number) => {
    try {
      filtros.page = page;
      const res = await listarPessoas(filtros);
      setData(res.data["pessoas"]);
      setPagination(res.data["paginacao"]);
    } catch (error) {
      console.error(errorMsg(error));
    } finally {
      return;
    }
  };

  const listaCombo = async (id: string) => {
    try {
      const res = await listarPessoa(id);
      setData(res.data["pessoas"]);
      setPagination(res.data["paginacao"]);
    } catch (error) {
      console.error(errorMsg(error));
    }
  };

  const pesquisarPessoa = async () => {
    setFiltros((oldFiltros) => ({ ...oldFiltros, pNome: pNome }));
  };

  return (
    <>
      <div>
        <Header titulo="Consulta de Pessoa Física" />
      </div>
      <div className="container">
        <div className="md:flex gap-3 sm:grid sm:grid-cols-1  grid grid-cols-1 items-center">
          <div className="relative w-full">
            <input
              name="pNome"
              type="text"
              className="custom-input  pr-[65px]"
              placeholder="Pesquisar nome..."
              value={pNome}
              onChange={(event) => setpNome(event?.target.value)}
            />
            <button
              className="absolute right-0 top-0 h-full px-3"
              onClick={pesquisarPessoa}
            >
              <i className="bi bi-search text-defaultWhite"></i>
            </button>
          </div>

          <Select
            setValue={(name, id) => listaCombo(id)}
            data={listaPessoas}
            desc="pNome"
            id="_id"
            value="_id"
            sName="pNome"
          />
          <div className=" sm:text-center">
            <button
              className="custom-btn-action  text-defaultWhite"
              onClick={() => {
                setFiltros(() => new FiltrosListagem());
                setpNome("");
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
        {pagination && (
          <div>
            <DataTable
              data={data}
              paginacao={pagination}
              onDelete={() => {
                listarData(1);
                listarComboP();
              }}
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
      </div>
    </>
  );
};
