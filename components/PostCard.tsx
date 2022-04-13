import Link from "next/link";
import { urlFor } from "../sanity";

import { Post } from "../typings";

function Post(post: Post) {
    return (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
            <main className="group overflow-x-hidden rounded-lg border shadow-lg">
                {post.mainImage && (
                    <img
                        className="h-64 w-full cursor-pointer object-cover transition-transform group-hover:scale-105"
                        src={urlFor(post.mainImage).url()!}
                        alt="title image"
                    />
                )}
                <section className="flex items-center justify-between bg-white p-5">
                    <div className="flex flex-col justify-between gap-3">
                        <p className="font-semibold">{post.title}</p>
                        <p className="text-gray-500">
                            {post.description} by {post.author.name}
                        </p>
                    </div>
                    {post.author.image && (
                        <img
                            className="h-12 w-12 cursor-pointer rounded-full"
                            src={urlFor(post.author.image).url()!}
                            alt="author image"
                        />
                    )}
                </section>
            </main>
        </Link>
    );
}

export default Post;
