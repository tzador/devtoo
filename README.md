# DevToo - dev.to Article Recommender

https://devtoo.dev

## Description
DevToo is a https://dev.to article recommendation and search engine developed to improve the scope and relevancy of suggested articles for readers.
This project extends beyond the default four articles typically recommended by dev.to.
It offers a web interface, a bookmarklet, and a Chrome extension for easy integration with dev.to.

The recommendation system in DevToo is built using OpenAI text vector embeddings and a pgvector PostgreSQL index.
These technologies help to search for articles based on the cosine similarity of their titles, descriptions, and tags,
enhancing the quality of the recommended articles.

The user interface is implemented with SvelteKit, while Prisma is employed for PostgreSQL database connections.

## Contributing
Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please ensure to update tests as appropriate.

License
DevToo is licensed under the MIT license. For more information, refer to the LICENSE file in this repository.
