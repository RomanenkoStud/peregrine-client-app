type Props = {
  className?: string;
  children?: React.ReactNode,
}

export const SectionTitle = ({className='', children}: Props) => {
  return (
    <h3 className={`flex justify-center mb-4 text-2xl text-peregrine text-center py-2 ${className}`}>
      <span className="relative pb-1 after:rounded after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-peregrine">
        {children}
      </span>
    </h3>
  );
};