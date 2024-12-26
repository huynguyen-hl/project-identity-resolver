import { app } from './app';
import { API_VERSION, DOMAIN, PORT, PROTOCOL } from './config';

app.listen(PORT, () => {
    console.log(`Server is running: ${PROTOCOL}://${DOMAIN}:${PORT}/${API_VERSION} 🚀`);
});
