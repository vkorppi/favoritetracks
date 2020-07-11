
import user from '../services/user';
import spotify from '../services/spotify';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { MongoError } from 'mongodb';
import { UserSchemaType, searchResult, spotifyTrackMinimal, TokenType, spotifyTrackNoUrls, spotifyToken, refreshtoken } from '../types';


export const resolvers = {

    Query: {



        search: async (_root: any, args: { track: string; page: number; }): Promise<searchResult | void> => {

            const track: string = args.track;
            const page: number = args.page;

            let tracks: spotifyTrackMinimal[] | null = null;

            let total: number;

            return track.includes('Test_') ? spotify.test(track, page) :
                await spotify.search(track, page).then(result => {

                    tracks = result.tracks.items;
                    total = result.tracks.total;

                    return { tracks: tracks, total: total };

                }).catch((error: Error) => {

                    console.error(error.stack);

                    if (error instanceof ApolloError) {
                        throw new ApolloError(error.message);
                    }
                    else if (error instanceof UserInputError) {
                        throw new UserInputError(error.message);
                    }
                });


        },



        searchUser: async (_root: any, args: { value: string; }): Promise<UserSchemaType[] | void> => {

            const value: string = args.value;


            return await user.search(value).then(result => {

                return result;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

        },

        getUser: async (_root: any, args: { id: string; }): Promise<void | UserSchemaType | null> => {

            const id: string = args.id;

            return await user.getUser(id).then(result => {

                return result;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

        },
        
        getList: async (_root: any, args: any, userdata: UserSchemaType): Promise<void | spotifyTrackNoUrls[] | null> => {

            if(!userdata || !userdata.id) {
                return null;
            }
        
            return await spotify.GetList(userdata.id).then(result => { 
    
                return result.items.map(value => (
                { 
                    name: value.track.name,
                    uri: value.track.uri,
                    external_urls: value.track.external_urls 
                }
                ));

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

        },

        delegateToken: async (_root: any, args: { code: string,playlist: string }, userdata: UserSchemaType ): Promise<void | spotifyToken> => {

            const code = args.code ;
            const playlist = args.playlist;

            await user.addPLaylist(playlist,userdata.id);
			
            return await spotify.delegateToken(code).then(result => { 
               
                return result;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

        },

        
    getUserLoggedin: async (_root: any, args: { code: string,playlist: string }, userdata: UserSchemaType ): Promise<UserSchemaType | null> => {

        return await user.getUser(userdata.id);
    },

    delegateRefreshedToken: async (_root: any, args: { refreshedToken: string;}): Promise<void | refreshtoken> => {

        const refreshedToken = args.refreshedToken ;
                
        return await spotify.delegateRefreshedToken(refreshedToken).then(result => { 
		
			console.log(result)
           
            return result;

        }).catch((error: Error) => {

            console.error(error.stack);

            if (error instanceof ApolloError) {
                throw new ApolloError(error.message);
            }
            else if (error instanceof UserInputError) {
                throw new UserInputError(error.message);
            }

        });

    }


    },
    Mutation: {

        create: async (_root: any, args: {
            username: string, password: string, firstname: string,
            lastname: string, birthdate: string, email: string, address: string
        }): Promise<string | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const username: string = args.username;
            const password: string = args.password;
            const email: string = args.email;
            const address: string = args.address;
            const birthdate: string = args.birthdate;


            return await user.create(username, password, firstname, lastname, birthdate, email, address).then(result => {
                return `User was created with following data: username: ${username}, firstname: ${firstname}, lastname:  ${lastname} `+
                `birthdate: ${birthdate} email: ${email} address: ${address}`;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });


        },

        updateUser: async (_root: any, args: { firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string }): Promise<string | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const id: string = args.id;
            const birthdate: string = args.birthdate;
            const email: string = args.email;
            const address: string = args.address;


            return await user.update(firstname, lastname, birthdate, email, address, id).then(result => {
                return `User was updated with following data: firstname: ${firstname}, lastname:  ${lastname} `+
                `birthdate: ${birthdate} email: ${email} address: ${address}`;

            }).catch((error: Error) => {

                console.error(error.stack);


                if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });


        },

        updatePassword: async (_root: any, args: { password: string, id: string }): Promise<string | void> => {

            const password: string = args.password;
            const id: string = args.id;

            return await user.updatePassword(password, id).then(result => {

                return `User's password was updated. User's id was ${id}`;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });
        },

        remove: async (_root: any, args: { id: string }): Promise<string | void> => {

            const id: string = args.id;

            return await user.remove(id).then(result => {

                return `User with id: ${id} was removed`;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }



            });
        },

        login: async (_root: any, args: { username: string, password: string }): Promise<TokenType | void> => {

            const username: string = args.username;
            const password: string = args.password;

            return await user.login(username, password).then(result => {

                return result;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }



            });
        },


        addTrackToList: async (_root: any, args: { tracks: string[] }, userdata: UserSchemaType): Promise<string> => {

            const tracks: string[] = args.tracks;


            await spotify.AddToList(tracks, userdata.id).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

            return `Tracks: ${tracks.toString()} was added succesfully`;

        },

        removeItem: async (_root: any, args: { tracks: string[] }, userdata: UserSchemaType): Promise<string> => {

            const tracks: string[] = args.tracks;

            
            await spotify.removeItem(userdata.id,tracks).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

            return `Tracks: ${tracks.toString()} was removed succesfully`;

        }



    }
};

