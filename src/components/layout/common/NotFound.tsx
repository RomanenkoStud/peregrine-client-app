type Props = {
  className?: string;
}

export const NotFound = ({className=''}: Props) => {
  return (
    <h2 className={`next-ui text-primary ${className}`}>Not found</h2>
  );
};