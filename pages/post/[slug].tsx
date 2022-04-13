import Header from "../../components/Header";
import { client, urlFor } from "../../sanity";

import { Post, Comment } from "../../typings";
import { GetStaticProps } from "next";
import Head from "next/head";
import PortableText from "react-portable-text";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setSubmitted(false);
        await fetch("/api/createComment", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(() => {
                console.log(data);
                setSubmitted(true);
            })
            .catch((err) => {
                console.log(err);
                setSubmitted(false);
            });
    };

    return (
        <main>
            <Head>
                <title>Medium Blog - {post.title}</title>
            </Head>

            <Header />

            <img
                className="border-y-1 mx-auto h-[20rem] w-full border-y-black object-cover md:max-w-7xl"
                src={urlFor(post.mainImage).url()!}
                alt="image"
            />

            <article className="mx-auto mt-10 w-full md:max-w-4xl">
                <div className="space-y-3">
                    <h1 className="text-4xl">{post.title}</h1>
                    <h2 className="text-gray-700">{post.description}</h2>
                    <div className="flex items-center justify-start gap-3">
                        <img
                            className="h-10 w-10 cursor-pointer rounded-full object-cover"
                            src={urlFor(post.author.image).url()!}
                            alt="image"
                        />
                        <p className="text-xs text-gray-500">
                            Blog by{" "}
                            <span className="font-mono text-green-800">
                                {post.author.name}
                            </span>{" "}
                            - Published at{" "}
                            {post._createdAt &&
                                new Date(post._createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div>
                    <PortableText
                        className="prose prose-slate mt-10 lg:prose-xl"
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={{
                            h1: (props: any) => {
                                <h1
                                    className="my-5 text-2xl font-bold"
                                    {...props}
                                />;
                            },
                            h2: (props: any) => {
                                <h1
                                    className="my-5 text-xl font-bold"
                                    {...props}
                                />;
                            },
                            li: ({ children }: any) => {
                                <li className="ml-4 list-disc">{children}</li>;
                            },
                            link: ({ href, children }: any) => {
                                <a
                                    href={href}
                                    className="text-blue-500 hover:underline"
                                >
                                    {children}
                                </a>;
                            },
                            img: ({ src }: any) => {
                                <img
                                    src={src}
                                    className="border-y-1 border-y-black"
                                />;
                            },
                        }}
                    />
                </div>
            </article>
            <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />

            {submitted ? (
                <div className="mx-auto my-10 max-w-7xl bg-yellow-500 p-5">
                    <div className="mx-auto w-max space-y-1">
                        <h1 className="w-fit text-2xl font-bold text-gray-50">
                            Thank you for your comment!
                        </h1>
                        <h2 className="w-fit text-xs text-gray-100">
                            Once it has been approved, it will appear bellow.
                        </h2>
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto my-10 flex max-w-lg flex-col gap-5"
                >
                    {" "}
                    <div className="space-y-1">
                        <h2 className="text-yellow-500">
                            Enjoyed this article?
                        </h2>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Send us your comment bellow!
                        </h1>
                    </div>
                    <input
                        {...register("_id")}
                        type="hidden"
                        name="_id"
                        value={post._id}
                    />
                    <label className="flex flex-col space-y-1">
                        <span>Name</span>
                        <input
                            {...register("name", { required: true })}
                            className="rounded-sm border-0 shadow-lg ring ring-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            placeholder="John Mayer"
                            type="text"
                        />
                    </label>
                    <label className="flex flex-col space-y-1">
                        <span>Email</span>
                        <input
                            {...register("email", { required: true })}
                            className="rounded-sm border-0 shadow-lg ring ring-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            placeholder="your@email.com"
                            type="email"
                        />
                    </label>
                    <label className="flex flex-col space-y-1">
                        <span>Comment</span>
                        <textarea
                            {...register("comment", { required: true })}
                            className="rounded-sm border-0 shadow-lg ring ring-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                            placeholder="Enter long form content..."
                            rows={10}
                            cols={20}
                        ></textarea>
                    </label>
                    {/* errors will return when field validation fails  */}
                    {errors.name && (
                        <p className="text-red-500"> - name is required</p>
                    )}
                    {errors.email && (
                        <p className="text-red-500">
                            {" "}
                            - email field is required
                        </p>
                    )}
                    {errors.comment && (
                        <p className="text-red-500">
                            {" "}
                            - comment field is required
                        </p>
                    )}
                    <input
                        className="cursor-pointer rounded-sm bg-yellow-500 px-3 py-1 text-white shadow-lg transition-colors ease-in-out hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-yellow-500"
                        type="submit"
                    />
                </form>
            )}

            {/* Comments */}
            <section className="mx-auto my-10 max-w-lg space-y-3 rounded-sm p-5 shadow-lg ring ring-gray-200">
                <h1 className="border-b text-lg font-bold text-yellow-500">
                    Comment Section
                </h1>

                {!(post.comments.length == 0) ? (
                    post.comments.map((comment: Comment) => {
                        return (
                            <div
                                key={comment._id}
                                className="space-y-2 rounded bg-gray-100 p-3"
                            >
                                <div className="flex justify-between border-b text-xs text-gray-400">
                                    <h1 className="font-mono">
                                        {comment.email}
                                    </h1>
                                    <h2>
                                        {new Date(
                                            comment._createdAt
                                        ).toLocaleString()}
                                    </h2>
                                </div>
                                <p className="text-gray-800">
                                    <span className="text-yellow-500">
                                        {comment.name}
                                    </span>
                                    {" : "}
                                    {comment.comment}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <h1 className="text-gray-800">No comments yet {":("}</h1>
                )}
            </section>
        </main>
    );
}

export default Post;

export const getStaticPaths = async () => {
    const query = `
    *[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;

    const posts = await client.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _ref,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        "comments": *[
        _type == "comment" && post._ref == ^._id && approved == true
        ],
        description,
        mainImage,
        slug,
        body
    }`;

    const post = await client.fetch(query, { slug: params?.slug });

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
        revalidate: 60,
    };
};
