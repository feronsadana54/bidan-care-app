export default function Alert(props) {
  // eslint-disable-next-line react/prop-types
  const { className, children, title } = props;
  return (
    <>
      <div className={className} role="alert">
        <span className="font-medium">{title}: </span>
        {children}
      </div>
    </>
  );
}
