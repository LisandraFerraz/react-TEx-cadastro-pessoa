import { useState } from "react";

interface SelectPessoa<T> {
  setValue?: (name: string, value: any) => void;
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

    console.log(e.currentTarget.value);
    if (validacao) {
      setMsgError(validacao() ? validacao : "");
    }
  };

  return (
    <>
      <select
        className="text-bgDark"
        name={sName as string}
        onChange={(e) => handleOnChange(e)}
        onBlur={() => {
          if (validacao) {
            setMsgError(validacao() ? validacao : "");
          }
        }}
      >
        {data.map((item, index) => (
          <option
            key={index}
            value={item[value] as string}
            id={item[id] as any}
          >
            {item[desc] as string}
          </option>
        ))}
      </select>
      {msgError && <span className="text-defaultWhite">{msgError}</span>}
    </>
  );
};
