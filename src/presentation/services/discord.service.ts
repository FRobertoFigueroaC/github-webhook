import { envs } from '../../config';

export class DiscordService {

  private readonly discordWebhookUrl:string = envs.DISCORD_WEHOOK_URL;

  constructor(){}

  async notify(message:string){
    const body = {
      content: message,
      embeds: [
        {
          image: { 
            url: 'https://media.giphy.com/media/3o6Mbk1aTs0yHlJfIk/giphy.gif?cid=790b7611pgmvwow0vj9vzy9bjti73dpmexn7eu19lkaytmpi&ep=v1_gifs_search&rid=giphy.gif&ct=g'
          }
        }
      ]
    }

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(`Error sending message: ${message} to Discord`);
      // throw Error( `Error sending message: ${ message } to Discord` );
      return false
    }
    return true;
  }

}