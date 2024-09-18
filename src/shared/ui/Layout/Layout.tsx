import { FC, ReactNode } from 'react';

type TLayoutProps = {
  header: ReactNode;
  home: ReactNode;
};

const Layout: FC<TLayoutProps> = ({ header, home }) => {
  return (
    <>
      {header}
      <main>{home}</main>
    </>
  );
};

export { Layout };
