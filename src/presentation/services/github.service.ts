import { GithubIssuePayload, GithubStarPayload } from '../../interfaces';


export class GithubService {
  constructor(){}

  onStar(payload:GithubStarPayload): string {

    const { action, sender, repository, starred_at } = payload;
    
    return `User ${sender.login} ${action} star on ${repository.full_name} `;
  }
  onIssue(payload:GithubIssuePayload): string {
    let message:string;

    const { action, sender, repository, issue } = payload;
    return `User ${ sender.login } ${ action } an issue on ${ repository.full_name } with this title: ${ issue.title }`;
  }
}