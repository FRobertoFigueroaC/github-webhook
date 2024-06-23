import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';

export class GithubController {

  constructor(private readonly githubService = new GithubService()){

  }

  webhookHandler = (req: Request, res:Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const { body: payload } = req;

    let message: string  = '';

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
      break;
      case 'issues':
        message = this.githubService.onIssue(payload);
      break;
    
      default:
        message = `Unknown event: ${githubEvent}`;
        break;
    }

    res.status(201).json('Accepted');
  }
}