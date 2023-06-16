import { useParams } from "react-router-dom";

export const Account = (): JSX.Element => {
  const { userName } = useParams();

  return (
    <section>
      <p>Hello {userName}</p>
    </section>
  );
};
