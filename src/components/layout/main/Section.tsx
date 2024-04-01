type Props = {
  className?: string;
  children?: JSX.Element|JSX.Element[],
}

export const Section = ({className='', children}: Props) => {
  return (
    <div className={`mb-8 ${className}`}>
      {children}
    </div>
  );
};