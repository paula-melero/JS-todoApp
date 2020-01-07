require('dotenv').config();
const { User } = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe( 'user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const DecPayload = jwt.verify(token, process.env.jwtPrivateKey); 

        expect(DecPayload).toMatchObject(payload);
    })
});