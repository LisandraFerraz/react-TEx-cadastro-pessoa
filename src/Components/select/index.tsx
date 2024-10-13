interface Props<T> {
  setValue?: (value: any) => void;
  value: keyof T;
  id: keyof T;
  desc: keyof T;
  data: T[];
}

export const Select = <T extends object>({
  desc,
  value,
  id,
  data,
  setValue,
}: Props<T>) => {
  return (
    <>
      <select
        className="text-bgDark"
        name=""
        onChange={(e) => {
          if (setValue) setValue(e.currentTarget.value);
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
