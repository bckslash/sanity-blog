import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

function About() {
    return (
        <main className="flex min-h-screen flex-col justify-between">
            <Head>
                <title>Blog - About me</title>
            </Head>

            <Header />

            <section className="mx-auto flex max-w-2xl flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-5 text-center">
                    <img
                        className="w-24 md:w-48"
                        src="https://avatars.githubusercontent.com/u/65281063?v=4"
                        alt="avatar"
                    />
                    <h1 className="text-xl ">Robert Smrek</h1>
                </div>
                <div className="pp-10 p-10 text-center">
                    <p>Hello,</p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nemo at asperiores voluptatum ratione repudiandae
                        id aliquam sequi accusamus non optio voluptas assumenda
                        tenetur vero totam, veritatis saepe cumque quidem quasi.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default About;
