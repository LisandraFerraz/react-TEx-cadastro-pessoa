import { useEffect, useState } from "react";
import { IPagination } from "../../utils/interfaces/pagination";

export const Pagination = ({
  totalItems,
  itemsPagina,
  paginaAtual,
  nextPage,
}: IPagination) => {
  const [pagNumbers, setPagNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPagina); i++) {
      numbers.push(i);
    }
    setPagNumbers(numbers);
  }, [totalItems, itemsPagina]);

  return totalItems > itemsPagina ? (
    <div className="flex flex-row items-end gap-1">
      <button
        onClick={() => (totalItems > 1 ? nextPage(paginaAtual - 1) : "")}
        className="bg-inputBtnBg squareBtn"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      {pagNumbers.map((page) => (
        <button
          key={page}
          onClick={() => nextPage(page)}
          className={`${
            paginaAtual === page ? "bg-pastelBlue" : "bg-inputBtnBg"
          }  squareBtn`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => (totalItems > 1 ? nextPage(paginaAtual + 1) : "")}
        className=" bg-inputBtnBg squareBtn"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  ) : (
    <></>
  );
};
