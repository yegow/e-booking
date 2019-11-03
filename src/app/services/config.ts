import { environment as devConfig } from '../../environments/environment';
// import { environment as prodConfig } from '../../environments/environment.prod';

const server: {
    url: string;
    apiEnd: string;
    ext: string;
} = {
    ...devConfig.server,
    ext: ''
};

// server = {
//   ...prodConfig.server,
//   ext: '.php'
// };

export {
    server
};
