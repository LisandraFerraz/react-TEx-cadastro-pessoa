import { deletarPessoa, listarPessoas } from "../../Shared/pessoaF-service";
import { IPagination } from "../../utils/interfaces/pagination";
import { IPessoaFisica } from "../../utils/interfaces/pessoa-fisica";
import { Pagination } from "../pagination";

interface DataTableProps {
  data: IPessoaFisica[];
  paginacao: IPagination;
  onDelete: (page: number) => void;
}
export const DataTable = ({ data, paginacao, onDelete }: DataTableProps) => {
  const deletarPessoaF = async (id: string) => {
    await deletarPessoa(id);
    return onDelete(1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
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
            <tr key={index}>
              <td>
                {/* <button onClick={() => deletarPessoaF(pf._id)}>DELETAR</button> */}
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
  );
};
