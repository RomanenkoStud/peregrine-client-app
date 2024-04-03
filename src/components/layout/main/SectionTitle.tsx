type Props = {
  className?: string;
  children?: React.ReactNode,
}

export const SectionTitle = ({className='', children}: Props) => {
  return (
    <h3 className={`next-ui flex justify-center text-2xl text-primary text-center py-2 ${className}`}>
      <span className="next-ui relative pb-1 after:rounded after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary">
        {children}
      </span>
    </h3>
  );
};