import "react-quill/dist/quill.snow.css";
import LoginHook from "../hooks/LoginHook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  addLike,
  deleteComment,
  getBlogId,
} from "../services/blogAPI";
import moment from "moment/moment";
import { getDataById } from "../services/userAPI";
import { FaHeart, FaTrashCan } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

export default function BlogDetail() {
  const { userId } = LoginHook();
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingComment, setLoadingComment] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentButtonDisabled, setCommentButtonDisabled] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    getBlogId(id, async (response) => {
      setBlog(response.data.data);
      setLikes(response.data.data.likes);
      if (response.data.data.comments) {
        setTimeout(() => {
          setLoadingComment(false);
        }, 3000);
        setComments(response.data.data.comments);
      }
      setLoading(false);
    });
  }, [blog, id, comments, likes]);

  useEffect(() => {
    if (userId) {
      getDataById(userId, (response) => {
        setProfile(response.data.fotoProfil);
      });
    }
  }, [comments, userId]);

  const handleComment = (e) => {
    e.preventDefault();
    const comment = commentText;
    if (userId && id) {
      if (comment !== "") {
        const data = {
          comment,
          userId,
        };
        addComment(id, data, () => {
          setCommentText("");
          setCommentButtonDisabled(false);
        });
        setLoadingComment(true);
        setCommentButtonDisabled(true);
      } else {
        alert("Komentar kosong!");
      }
    }
  };

  const handleDelete = (idComment) => {
    deleteComment(id, idComment);
    setLoadingComment(true);
  };

  const handleLike = (e) => {
    const data = e.target.value;
    addLike(id, data, (response) => {
      console.log(response);
    });
  };

  return (
    <>
      {blog && (
        <Helmet>
          <title>{blog.judul}</title>
        </Helmet>
      )}
      {loading ? (
        <p className="text-center mt-5">
          <b>Loading...</b>
        </p>
      ) : (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 ">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl border-solid shadow-xl p-3">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  {blog && (
                    <address className="flex items-center mb-6 not-italic">
                      <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        {profile != "" ? (
                          <img
                            className="mr-4 w-16 h-16 rounded-full"
                            src={profile}
                            alt="Foto Profile"
                          />
                        ) : (
                          <img
                            className="mr-4 w-16 h-16 rounded-full"
                            src="/src/assets/img/user.png"
                            alt="Foto Profile"
                          />
                        )}
                        <div>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {blog.penulis}
                          </p>
                          <p className="text-base font-light text-gray-500 dark:text-gray-400">
                            <time
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              Ditulis pada{" "}
                              {moment(blog.createdAt).format("DD-MM-YYYY")}
                            </time>
                          </p>
                        </div>
                      </div>
                    </address>
                  )}

                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">
                    {blog.judul}
                  </h1>
                </header>

                <figure>
                  <img src={blog.gambarBlog} alt="Gambar Blog" />
                </figure>
                <div
                  className="artikel"
                  dangerouslySetInnerHTML={{ __html: blog.artikel }}
                ></div>
              </article>
            </div>
          </main>
          <section className="not-format p-5">
            {blog && (
              <div className="flex items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mr-3">
                  Comment
                </h2>
                <button
                  className="btn btn-primary mr-3"
                  onClick={handleLike.bind(this)}
                  id="like"
                  name="like"
                  value={true}
                >
                  Like this blog!
                </button>
                <p className="mr-3 flex">
                  {" "}
                  <FaHeart className="mr-2" /> {likes}
                </p>
              </div>
            )}
            <form className="mb-6" onSubmit={handleComment.bind(this)}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <textarea
                  id="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 textarea-lg"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={commentButtonDisabled}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg "
                disabled={commentButtonDisabled}
              >
                Post comment
              </button>
            </form>
            {loadingComment ? (
              <span className="loading loading-dots loading-lg text-center"></span>
            ) : (
              comments &&
              comments.map((item, index) => {
                return (
                  <article
                    className="p-6 mb-6 text-base bg-slate-400 rounded-lg dark:bg-gray-900"
                    key={index}
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={
                              item.profile == ""
                                ? "/src/assets/img/user.png"
                                : item.profile
                            }
                            alt="Michael Gough"
                          />
                          {item.penulis}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time>
                            {item.createdAt &&
                              moment(item.createdAt).format("DD-MM-YYYY")}
                          </time>
                        </p>
                      </div>
                      {item.user == userId && (
                        <button
                          onClick={handleDelete.bind(this, item._id)}
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <FaTrashCan />
                        </button>
                      )}
                    </footer>
                    <p>{item.comment}</p>
                  </article>
                );
              })
            )}
          </section>
        </>
      )}
    </>
  );
}
