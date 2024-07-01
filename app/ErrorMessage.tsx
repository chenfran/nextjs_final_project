import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ErrorMessage(props: Props) {
  return <div className="text-red-600">{props.children}</div>;
}
