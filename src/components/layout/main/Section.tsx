type Props = {
  className?: string;
  children?: React.ReactNode,
}

export const Section = ({className='', children}: Props) => {
  return (
    <div className={`mb-8 ${className}`}>
      {children}
    </div>
  );
};