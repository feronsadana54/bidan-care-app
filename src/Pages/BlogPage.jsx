import { Helmet } from "react-helmet-async";
import BlogForm from "../components/Fragments/BlogForm";
import LoginHook from "../hooks/LoginHook";

export default function BlogPage() {
  LoginHook();
  return (
    <>
      <Helmet>
        <title>Create Blog</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
          <BlogForm />
        </div>
      </div>
    </>
  );
}
