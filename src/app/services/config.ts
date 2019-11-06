import { environment as devConfig } from '../../environments/environment';
import { environment as prodConfig } from '../../environments/environment.prod';

let server: {
    url: string;
    apiEnd: string;
    ext: string;
} = {
    ...devConfig.server,
    ext: '',
};

const PROD = false;

if (PROD) {
  server = {
    ...prodConfig.server,
    ext: '.php'
  };
}

export {
    server
};
