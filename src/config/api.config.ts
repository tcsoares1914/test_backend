import { registerAs } from '@nestjs/config';
import { ApiConfig } from '@src/interfaces/api';

const { APPLICATION_PORT, SECRET_KEY_JWT } = process.env;

export const defaultApiConfig: ApiConfig = {
  port: parseInt(APPLICATION_PORT, 10) || 3000,
  secretKeyJwt:
    SECRET_KEY_JWT ||
    'GT0DVjYp/nbzmr+p25VnuMy6zEJ2ekIu7o9Jr6G+gCotQAl+MrcYVLfGIF5Y3BoJ',
};

export default registerAs('api', (): ApiConfig => defaultApiConfig);
