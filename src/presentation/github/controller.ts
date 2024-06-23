import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GithubController {

  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()

  ){

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

    this.discordService.notify(message)
    .then(response => {
      return response 
              ? res.status(202).json('Message successfully sent to Discord')
              : res.status(500).json('error when trying to send message to Discord');
    })
    .catch(error => res.status(500).json({error}))
  }
}