type Props = {
  className: string;
  children?: JSX.Element,
}

const Content = ({className='', children}: Props) => {
  return (
    <div className={`mx-4 ${className}`}>
      {children}
    </div>
  );
};

export default Content;