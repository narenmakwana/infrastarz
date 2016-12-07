import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class GithubService extends BaseService {

  constructor(protected _http: Http) {
    super(_http);
  }

  getHeaders(): Headers {
    return new Headers();
  }

  recentCommits(): Observable<Commit[]> {
    return this.get('https://api.github.com/repos/angular/angular/commits').map((res: Response) => {
      let data: any[] = res.json();
      return data.map((commit: any) => {
        if(commit.author != null) {
          return {url : commit.html_url, title : '', message : commit.commit.message, author : commit.author.login, authorUrl : commit.author.html_url, avatarUrl : commit.author.avatar_url, date : commit.commit.author.date};
        }
        return {url : commit.html_url, title : '', message : commit.commit.message, author : 'Unknown', authorUrl : '', avatarUrl : '', date : ''};
      })
    });
  }

  commitActivity(): Observable<[number, number][]> {
    return this.get('https://api.github.com/repos/angular/angular/stats/commit_activity').map((res: Response) => {
      let data: any[] = res.json();
      data.sort(GithubService.compare('week'));
      let response: [number, number][] = [];
      for (let i = 0; i < data.length; i++) {
        for (let a = 0; a < data[i].days.length; a++) {
          response.push([(data[i].week + (86400 * a)) * 1000, data[i].days[a]]);
        }
      }
      return response;
    });
  }

  contributors(): Observable<[string, number][]> {
    return this.get('https://api.github.com/repos/angular/angular/stats/contributors').map((res: Response) => {
      return res.json().sort(GithubService.compare('total', true)).map(contrib => {
        return [contrib.author.url, contrib.total];
      });
    });
  }

  private static compare(field: string, reverse: boolean = false): (a: any, b: any) => number {
    return (d1: any, d2: any) => {
      if(d1[field] < d2[field]) {
        return reverse ? 1 : -1;
      } else if(d1[field] === d2[field]) {
        return 0;
      } else {
        return reverse ? -1 : 1;
      }
    }
  }
}

export interface Commit {
  url: string;
  title: string;
  message: string;
  author: string;
  authorUrl: string;
  avatarUrl: string;
  date: string;
}
