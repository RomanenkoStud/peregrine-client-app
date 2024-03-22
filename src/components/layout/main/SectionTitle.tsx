type Props = {
  className: string;
  children?: JSX.Element,
}

export const SectionTitle = ({className='', children}: Props) => {
  return (
    <h3 className={`text-2xl text-peregrine text-center py-2 ${className}`}>
      {children}
    </h3>
  );
};