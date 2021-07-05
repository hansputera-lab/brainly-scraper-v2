export const graphql_query = "query SearchQuery($query: String!, $first: Int!, $after: ID) {\n        questionSearch(query: $query, first: $first, after: $after) {\n            count\n            edges {\n                node {\n                    databaseId\n                    content\n                    points\n                    created\n                    lastActivity\n                    subject {\n                    name\n                    slug\n                    }\n                    grade {\n                        name\n                        slug\n                        }\n                        attachments {\n                        url\n                    }\n                    author {\n                        databaseId\n                        nick\n                        points\n                        gender\n                        description\n                        isDeleted\n                        avatar {\n                            url\n                        }\n                        category\n                        clientType\n                        rank {\n                            databaseId\n                            name\n                        }\n                        receivedThanks\n                        bestAnswersCount\n                        helpedUsersCount\n                    }\n                    isAuthorsFirstQuestion\n                    canBeAnswered\n                    pointsForAnswer\n                    pointsForBestAnswer\n                    answers {\n                        nodes {\n                            databaseId\n                            content\n                            points\n                            isBest\n                            created\n                            rating\n                            ratesCount\n                            thanksCount\n                            attachments {\n                                url\n                            }\n                            author {\n                                databaseId\n                                nick\n                                points\n                               gender\n                                description\n                                isDeleted\n                                avatar {\n                                    url\n                                }\n                                category\n                                clientType\n                                rank {\n                                    databaseId\n                                    name\n                                }\n                                receivedThanks\n                                bestAnswersCount\n                                helpedUsersCount\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }";
export const baseURLs = {
    id: "https://brainly.co.id",
    //us: "https://brainly.com",
    es: "https://brainly.lat",
    pt: "https://brainly.com.br",
    ru: "https://znanija.com",
    ro: "https://brainly.ro",
    tr: "https://eodev.com",
    ph: "https://brainly.ph",
    pl: "https://brainly.pl",
    hi: "https://brainly.in"
}
export const languages = Object.keys(baseURLs);