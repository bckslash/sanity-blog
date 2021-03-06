import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { client, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
    posts: Post[];
}

function Home({ posts }: Props) {
    return (
        <main className="min-h-screen">
            <Head>
                <title>Medium Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <section className="mx-auto flex items-center justify-evenly border-y border-y-gray-800 bg-yellow-400 p-10 md:mx-20 lg:mx-40 lg:p-0 xl:mx-60 ">
                <div className="space-y-5 px-10">
                    <h1 className="max-w-xl font-serif text-6xl">
                        <span className="underline underline-offset-2">
                            Personal blog,
                        </span>{" "}
                        write and share stories and ideas.
                    </h1>
                    <h2 className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Temporibus, quo?
                    </h2>
                </div>
                <img
                    className="hidden h-32 md:inline-flex lg:h-1/2"
                    src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
                    alt="Medium logo"
                />
            </section>

            {/* { Posts} */}
            <section className="mx-auto grid grid-cols-1 items-center gap-10 md:mx-20 md:grid-cols-2 md:py-10 lg:mx-40 lg:grid-cols-3 xl:mx-60">
                {posts.map((post) => {
                    return <PostCard key={post._id} {...post} />;
                })}
            </section>

            <Footer />
        </main>
    );
}

export async function getServerSideProps() {
    const query = `
        *[_type == "post"]{
            _id,
            title,
            author -> {
                name,
                image
            },
            description,
            mainImage,
            slug
        }`;

    const posts = await client.fetch(query);

    return {
        props: {
            posts,
        }, // will be passed to the page component as props
    };
}

export default Home;
