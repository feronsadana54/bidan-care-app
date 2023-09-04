import LogoImage from "./../../assets/img/BidanCareLogo.png";

/* eslint-disable react/prop-types */
export default function AuthLayout(props) {
  const { children, judul } = props;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow dark:border dark:border-gray-700">
        <div className="w-full">
          <img src={LogoImage} alt="Logo" />
        </div>
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            {judul}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
