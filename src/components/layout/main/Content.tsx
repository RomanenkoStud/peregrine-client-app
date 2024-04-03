type Props = {
  className?: string;
  children?: JSX.Element|JSX.Element[],
}

export const Content = ({className='', children}: Props) => {
  return (
    <div className={`container flex flex-col flex-1 mx-auto ${className}`}>
      {children}
    </div>
  );
};