interface InputPessoa<T> {
  iValue: keyof T;
  iName: keyof T;
  iType: keyof T;
  iPlaceholder: keyof T;
  iId: keyof T;
  setValue: (name: string, value: string) => void;
  setBlur?: (value: string) => void;
}

export const InputFormPessoa = <T extends object>({
  iValue,
  setValue,
  iName,
  iType,
  iPlaceholder,
  iId,
  setBlur,
}: InputPessoa<T>) => {
  return (
    <>
      <input
        className="text-bgDark"
        name={iName as string}
        id={iId as string}
        type={iType as string}
        placeholder={iPlaceholder as string}
        value={iValue as string}
        onBlur={(e) => {
          if (setBlur) {
            setBlur(e.currentTarget.value);
          }
        }}
        onChange={(e) => {
          setValue(iName as string, e.target.value);
        }}
      />
    </>
  );
};
