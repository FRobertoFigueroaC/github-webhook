import 'dotenv/config'
import { get } from 'env-var'

export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  DISCORD_WEHOOK_URL: get('DISCORD_WEHOOK_URL').required().asUrlString(),
}