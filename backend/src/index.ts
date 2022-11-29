import express from 'express';

const index = express();
const port = 3000;

index.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});