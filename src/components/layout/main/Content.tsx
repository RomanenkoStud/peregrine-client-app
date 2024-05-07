type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Content = ({ className = "", children }: Props) => {
  return (
    <div className={`container flex flex-col mx-auto ${className}`}>
      {children}
    </div>
  );
};
