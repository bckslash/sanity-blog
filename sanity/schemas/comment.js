export default {
    name: "comment",
    type: "document",
    title: "Comment",

    fields: [
        {
            name: "name",
            type: "string",
        },
        {
            title: "approved",
            name: "approved",
            type: "boolean",
            description: "comments won't be displayed unless approved",
        },
        {
            name: "email",
            type: "string",
        },
        {
            name: "comment",
            type: "string",
        },
        {
            name: "post",
            type: "reference",
            to: [{ type: "post" }],
        },
    ],
};