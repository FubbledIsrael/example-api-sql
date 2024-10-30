import app from './src/app.js';
import constant from './src/config/constant.js';
import process from 'node:process';

//Setup Timezone 
process.env.TZ = "America/Tijuana";

//Start Server
app.listen(constant.PORT, () => {
    console.log(`Server On, Port: ${constant.PORT}`);
});

//Out Server 
process.on('exit', () => {
    console.log(`Server Off`);
});