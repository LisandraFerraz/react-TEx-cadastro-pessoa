import { useNavigate } from "react-router-dom";
import { deletarPessoa } from "../../Shared/pessoaF-service";
import { IPagination } from "../../utils/interfaces/pagination";
import { IPessoaFisica } from "../../utils/interfaces/pessoa-fisica";

interface DataTableProps {
  data: IPessoaFisica[];
  paginacao: IPagination;
  onDelete: (page: number) => void;
}
export const DataTable = ({ data, onDelete }: DataTableProps) => {
  const navigate = useNavigate();

  const deletarPessoaF = async (id: string) => {
    await deletarPessoa(id);
    return onDelete(1);
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="my-6 overflow-auto ">
            <table className="min-w-[1220px] ">
              <thead className="bg-hightlightGrey uppercase text-sm text-defaultWhite">
                <tr className="h-[45px] text-left">
                  <th>ações</th>
                  <th>nome</th>
                  <th>cpf</th>
                  <th>data nasc.</th>
                  <th>telefone</th>
                  <th>estado</th>
                  <th>cidade</th>
                  <th>email</th>
                  <th>estado civil</th>
                  <th>profissão</th>
                </tr>
              </thead>
              {data?.map((pf: any, index) => (
                <tbody>
                  <tr
                    key={pf._id}
                    className="text-defaultWhite w-fit bg-bgGrey h-[45px] "
                  >
                    <td className="flex flex-row gap-3 ">
                      <button
                        className="custom-btn-action"
                        onClick={() => navigate(`/atualizar-pessoa/${pf._id}`)}
                      >
                        <i className="bi bi-pencil-square text-lg"></i>
                      </button>
                      <button
                        onClick={() => deletarPessoaF(pf._id)}
                        className="custom-btn-action"
                      >
                        <i className="bi bi-trash text-pastelRed text-lg"></i>
                      </button>
                    </td>
                    <td>{pf.pNome}</td>
                    <td>{pf.pCpf}</td>
                    <td>{pf.pDataNasc}</td>
                    <td>{pf.pTelefone}</td>
                    <td>{pf.pEstado}</td>
                    <td>{pf.pCidade}</td>
                    <td>{pf.pEmail}</td>
                    <td>{pf.pEstadoCivil}</td>
                    <td>{pf.pProfissao}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-defaultWhite text-center py-10">
            Sem registros.
          </h1>
        </>
      )}
    </>
  );
};
