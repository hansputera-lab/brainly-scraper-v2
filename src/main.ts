import Got from "got";
import { baseURLs, graphql_query, languages } from "./config";
import BrainlyError from "./error";
import type { Answer, BaseURLObject, BrainlyResponse, LanguageList, Question } from "./types";
import RandomUserAgent from "random-useragent";
import Util from "./util";

export default class Brainly {
    public clientRequest = (lang: LanguageList) => Got.extend({
        prefixUrl: `${this.getBaseURL(lang)}/graphql`,
        headers: {
            "user-agent": this.getAgent() as string
        }
    });

    /**
     * 
     * @param country - Here, please put your application server country code, if your server are in United States. Enter region/country code `us` to this parameter. Because what? All brainly website is protected, if you do not enter valid region/country code. It will trigger an Error Exception.
     */
    constructor(public country: LanguageList = "id") {
        if (!this.isValidLanguage(country)) throw new BrainlyError("Please put valid country!");
    }

    /**
     * Use this function if you want search question, it will returns question detail, question author, answer detail, attachments (if question or answer attachments is any), rating question and answer.
     * 
     * @param language What language want to search?
     * @param question A question you want to search. Example: `Pythagoras theory`
     * @param length Length array from question list
     */
    public async search(language: LanguageList = "id", question: string, length = 10) {
        if (!this.isValidLanguage(language)) throw new BrainlyError("Please put valid language!");
        const body = this.getRequestBody(question, length);
        const response = await this.clientRequest(this.country.toLowerCase() as LanguageList).post(language.toLowerCase(), {
            json: body
        });
        const validJSON = JSON.parse(response.body)[0].data.questionSearch.edges as BrainlyResponse[];
        
        const objects = validJSON.map(obj => {
            const question: Question = {
                id: obj.node.databaseId,
                content: Util.clearContent(obj.node.content),
                attachments: obj.node.attachments.map(attach => attach.url),
                author: {
                    id: obj.node.author.databaseId,
                    avatar_url: obj.node.author.avatar ? obj.node.author.avatar!.thumbnailUrl : undefined,
                    deleted: obj.node.author.isDeleted,
                    url: `${this.getBaseURL(language)}/app/profile/${obj.node.author.databaseId}`,
                    rank: obj.node.author.rank.name,
                    username: obj.node.author.nick
                },
                url: `${this.getBaseURL(language)}/${language.toLowerCase() == "id" ? "tugas" : "question"}/${obj.node.databaseId}`
            };

            const answers: Answer[] = obj.node.answers.nodes.map(answerObj => ({
              content: Util.clearContent(answerObj.content),
              attachments: answerObj.attachments.map(attach => attach.url),
              rates: answerObj.ratesCount,
              rating: answerObj.rating
            }));

            return {
                question, answers
            }
        });

        return objects;
    }

    private getRequestBody(question: string, length = 10) {
        return [{
            operationName: "SearchQuery",
            query: graphql_query,
            variables: {
                after: null,
                first: length,
                query: question
            }
        }];
    }

    private isValidLanguage(lang: LanguageList) {
        return languages.includes(lang.toLowerCase());
    }
    /**
     * This function will return brainly site url from your country selection in the constructor
     * 
     * @returns {String} - A base url of your country selection
     */
    public getBaseURL(lang: LanguageList): string {
        return (baseURLs as BaseURLObject)[lang];
    }

    /**
     * Use this function if you want get random user agent.
     * 
     */
    public getAgent() {
        return RandomUserAgent.getRandom();
    }
}