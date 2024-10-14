import { Link, useLocation } from "react-router-dom";

interface IHeaderProps {
  titulo: string;
}

export const Header = ({ titulo }: IHeaderProps) => {
  const location = useLocation();
  return (
    <>
      <div className="w-full h-1 rounded-lg bg-gradient-to-l from-pastelPink to-pastelBlue"></div>
      <h1 className="py-6 text-center w-full text-2xl font-semibold text-defaultWhite">
        {titulo}
      </h1>
      {location.pathname !== "/" ? (
        <Link to={"/"} className="w-full underline mx-7 text-defaultWhite">
          <i className="bi bi-house"></i> Voltar
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};
