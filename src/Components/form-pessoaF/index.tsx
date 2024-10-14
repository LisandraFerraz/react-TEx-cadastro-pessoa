import { useState } from "react";
import { getDate } from "../../utils/functions/get-date";

interface InputPessoa<T> {
  iValue?: keyof T;
  iName?: keyof T;
  iType?: keyof T;
  iPlaceholder?: keyof T;
  iId?: keyof T;
  disabled?: boolean;
  setValue: (name: string, value: string) => void;
  setBlur?: (value: string) => void;
  validacao?: () => string | "";
}

export const InputFormPessoa = <T extends object>({
  iValue,
  setValue,
  iName,
  iType,
  iPlaceholder,
  iId,
  setBlur,
  validacao,
  disabled,
}: InputPessoa<T>) => {
  const [msgError, setMsgError] = useState<string>("");

  const handleBlur = (e: any) => {
    // para busca de endereço com cep
    if (setBlur) {
      setBlur(e.currentTarget.value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(iName as string, e.target.value);
    if (validacao) {
      setMsgError(validacao() ? validacao : "");
    }
    // modifica o estado no componente principal
    const { value } = e.target;
    setValue(iName as string, value);
  };

  return (
    <>
      <input
        disabled={disabled}
        className="text-bgDark"
        name={iName as string}
        id={iId as string}
        type={iType as string}
        placeholder={iPlaceholder as string}
        value={(iValue as string) || ""}
        onBlur={(e) => {
          handleBlur(e);
        }}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {msgError && <span className="text-defaultWhite">{msgError}</span>}
    </>
  );
};
