import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://ibiekay:sonorous@ultimategrants.przia9q.mongodb.net/?retryWrites=true&w=majority&appName=ultimategrants')
    .then(() => console.log('Connected!'));