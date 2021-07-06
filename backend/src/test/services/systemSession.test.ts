import user from '../../services/user';
import typeparsers from '../../utils/typeparsers';
import mongoose from 'mongoose';
import User from '../../mongo/user';
import { UserSchemaType } from '../../types/userTypes';
import { hashPassword } from '../../utils/userFunctions';
import dotenv from 'dotenv';

dotenv.config();

describe('Testing session services', () => {

    const parser = typeparsers.parseString;

    beforeAll(async () => {


        const env = process.env;

        const error = 'databseurl url was not as string';

        const configuration = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };

        await mongoose.connect(parser(env.DBTEST, error), configuration);

    });

    beforeEach(async () => {

        //await User.deleteMany({});
        await User.deleteMany({ "username": { $nin: ["adminUser"] } });

        const testuser: UserSchemaType = {
            username: 'usernameTest',
            password: hashPassword('passwordTest'),
            firstname: 'firstnameTest',
            lastname: 'lastnameTest'
        } as UserSchemaType;

        const userTest = new User(testuser);
        await userTest.save();

        const testuser2: UserSchemaType = {
            username: 'username2daTest',
            password: hashPassword('passworqedTest'),
            firstname: 'firstqwenameTest',
            lastname: 'lastnameTest'
        } as UserSchemaType;

        const userTest2 = new User(testuser2);
        await userTest2.save();

    });


    test('New session is started for user', async () => {

        const userNosession = await User.findOne({ username: 'usernameTest' });

        await user.session.startSession(userNosession?._id);

        const userSessionExists = await User.findOne({ username: 'usernameTest' });

        expect(userSessionExists?.sessionid).toBeTruthy();

    });


    test('Session can be verified', async () => {

        let errorSessionExists = false;
        let errorNoSession = false;

        const userwithsession = await User.findOne({ username: 'usernameTest' }) as UserSchemaType;
        const userid = userwithsession._id as string;

        await User.updateOne({ _id: userid },
            {
                $set:
                {
                    "sessionid": "somevalue"
                }
            });
      

        

        await user.session.hasSession("somevalue").catch((_error: Error) => {
            errorSessionExists = true;
        });

        
        await User.updateOne({ _id: userid },
            {
                $set:
                {
                    "sessionid": ""
                }
            });

           
      
        await user.session.hasSession("somevalue").catch((_error: Error) => {
            
           
            errorNoSession = true;
        });

        expect(errorSessionExists).toBe(false);
        expect(errorNoSession).toBe(true);

    });


    test('Session can be ended', async () => {

        const userWithSession = await User.findOne({ username: 'usernameTest' });

        await user.session.endSession(userWithSession?._id);

        const userNoSession = await User.findOne({ username: 'usernameTest' });

        expect(userNoSession?.sessionid).toBeFalsy();

    });



    afterAll(async () => {
        // await User.deleteMany({});
        await User.deleteMany({ "username": { $nin: ["adminUser"] } });
        void mongoose.connection.close();
        console.log('Database connection closed');
    });

});