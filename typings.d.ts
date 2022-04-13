export interface Post {
    _id: string,
    _createdAt: string,
    title: string,
    author: {
        name: string,
        image: string
    },
    description: string,
    mainImage: {
        asset: {
            url: string
        }
    },
    slug: {
        current: string;
    },
    comments: Comment[],
    body: object[];
}

export interface Comment {
    _id: string,
    approved: boolean,
    comment: string,
    email: string,
    name: sring,
    post: {
        _ref: string,
        _type: string
    },
    _createdAt: string,
    _updatedAt: string,
    _ref: string,
    _type: string
}