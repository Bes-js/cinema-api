import { Injectable } from "@nestjs/common";
import axios from "axios";
import cheerio from "cheerio";

@Injectable()
export class GelecekService {
    constructor() { }

    async dataReturn(): Promise<any> {
        let response = await axios.get('https://www.paribucineverse.com/gelecek-filmler');
        var $ = cheerio.load(`${response.data}`);
        var data = [];
        for (let index = 1; index < 30; index++) {
            let title:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-info > h3`).text();
            if (!title || title == null) break;
            let banner:string = $(`#movieListRow > div:nth-child(${index}) > a > img`).attr('src');
            let date:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-info > p > span`).text();
            data.push({ title, banner, date });
        }
        return data;
    }

}