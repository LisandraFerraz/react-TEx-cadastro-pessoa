import { IPessoaFisica } from "../utils/interfaces/pessoa-fisica";
interface DataTableProps {
  data: IPessoaFisica[];
}
export const DataTable = ({ data }: DataTableProps) => {
  return (
    <div>
      {data.map((pf, index) => (
        <ul key={index}>
          <li>{pf.pNome}</li>
        </ul>
      ))}
    </div>
  );
};
