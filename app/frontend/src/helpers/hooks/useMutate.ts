import { useNavigate, useSearchParams } from "react-router-dom";

export const useMutate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mutate = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(
      "update",
      Math.ceil(Math.random() * 1000000).toString()
    );

    navigate({ search: newSearchParams.toString() }, { replace: true });
  };

  return { mutate };
};
