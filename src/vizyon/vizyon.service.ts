import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { YamlDatabase } from 'wio.db';
const localDatabase = new YamlDatabase({databasePath:"./storage.yml"});

@Injectable()
export class VizyonService {
    constructor() { }

    async dataReturn(): Promise<any> {
        let response = await axios.get('https://www.paribucineverse.com/vizyondakiler');
        var $ = cheerio.load(`${response.data}`);
        var data = [];
        for (let index = 1; index < 30; index++) {
            let title:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-info > h3`).text();
            if (!title || title == null) break;
            let banner:string = $(`#movieListRow > div:nth-child(${index}) > a > img`).attr('src');
            let rate:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-banner-techs > div.movie-banner-imdb-content.col-auto > div > div > div.text-area`).text().length > 0 ? $(`#movieListRow > div:nth-child(${index}) > div.movie-banner-techs > div.movie-banner-imdb-content.col-auto > div > div > div.text-area`).text().replaceAll("\n", "") : "Puanlanmamış";
            let time:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-info > p.movie-time.mb-0`).text();
            let type:string = $(`#movieListRow > div:nth-child(${index}) > div.movie-info > p.movie-type.mb-0`).text();
            let description:string;
            let originalTitle:string;
            if(localDatabase.has(`${banner}`)){
            let localData:any = localDatabase.get(`${banner}`);
            description = localData.description;
            originalTitle = localData.originalTitle;
            }else{
            let newResponse = await axios.get(`https://www.paribucineverse.com/${$(`#movieListRow > div:nth-child(${index}) > div.movie-action-buttons > a.movie-banner-incept-btn`).attr("href").replace("/","")}`);
            let $$ = cheerio.load(`${newResponse.data}`);
            description = $$(`body > main > section.content-section.page-film-detail-wrapper > div.sp-x.position-relative.film-detail-content > div > div:nth-child(2) > div.col-lg-7.film-detail-right > div > div.film-summary > p`).text().replaceAll("\n","");
            originalTitle = $$(`body > main > section.content-section.page-film-detail-wrapper > div.sp-x.position-relative.film-detail-content > div > div:nth-child(2) > div.col-lg-7.film-detail-right > div > h3`).text();
            localDatabase.set(`${banner}`,{description,originalTitle});
            }

            data.push({ title, originalTitle, description, type, banner, rate, time});
        }
        return data;
    }


}