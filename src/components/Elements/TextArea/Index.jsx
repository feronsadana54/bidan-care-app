/* eslint-disable react/prop-types */
export default function Textarea(props) {
  const { placeholder, name, children } = props;
  return (
    <>
      {" "}
      <div className="w-full">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {children}
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder={placeholder}
          id={name}
        ></textarea>
      </div>
    </>
  );
}
