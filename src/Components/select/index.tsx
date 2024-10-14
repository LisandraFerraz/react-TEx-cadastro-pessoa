import { useState } from "react";

interface SelectPessoa<T> {
  setValue?: (value: any, name: string) => void;
  value: keyof T;
  id: keyof T;
  desc: keyof T;
  sName: keyof T;
  data: T[];
  validacao?: () => string | "";
}

export const Select = <T extends object>({
  desc,
  value,
  id,
  data,
  setValue,
  sName,
  validacao,
}: SelectPessoa<T>) => {
  const [msgError, setMsgError] = useState<string>("");

  const handleOnChange = (e: any) => {
    if (setValue) setValue(value as string, e.currentTarget.value);
  };

  return (
    <>
      <select
        className="custom-input text-bgDark w-full"
        name={sName as string}
        onChange={(e) => handleOnChange(e)}
        onBlur={() => {
          if (validacao) {
            setMsgError(validacao() ? validacao : "");
          }
        }}
      >
        <option value="0">Selecionar</option>
        {data ? (
          data.map((item, index) => (
            <option
              key={index}
              value={item[value] as string}
              id={item[id] as any}
            >
              {item[desc] as string}
            </option>
          ))
        ) : (
          <option value="">Sem registros</option>
        )}
      </select>
      {msgError && (
        <span className="text-pastelRed font-normal text-sm">*{msgError}</span>
      )}
    </>
  );
};
