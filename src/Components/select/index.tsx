interface SelectPessoa<T> {
  setValue?: (name: string, value: any) => void;
  value: keyof T;
  id: keyof T;
  desc: keyof T;
  sName: keyof T;
  data: T[];
}

export const Select = <T extends object>({
  desc,
  value,
  id,
  data,
  setValue,
  sName,
}: SelectPessoa<T>) => {
  return (
    <>
      <select
        className="text-bgDark"
        name={sName as string}
        onChange={(e) => {
          if (setValue) setValue(value as string, e.currentTarget.value);
        }}
      >
        <option value="0" disabled>
          Selecionar pessoa
        </option>
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
    </>
  );
};
