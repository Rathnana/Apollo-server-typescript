import app from '../../firebase/firebaseAdmin';
import User from '../../model/User';

const resolvers = {
    Query: {
        books: () => [
            {
                title: "Made of Wolves",
                author: "James Carter",
            },
            {
                title: "The Visitor in the City",
                author: "Arthur Novotic",
            },
        ],
    },
    Mutation: {
        createUser: async (
            _root: undefined,
            { email }: { email: string },
            { pass }: { pass: string },
        ) => {

            let error = []
            try {
                // console.log(pass, email)
                app.auth().createUser({
                    email: email,
                    password: pass
                }).then(uid => console.log(uid))
                    .catch((error) => {
                        console.log('Error fetching user data:', error);
                        
                    });

                // const user = new User({
                //     name: 'Bill',
                //     email: 'bill@initech.com',
                //     avatar: 'https://i.imgur.com/dM7Thhn.png'
                // });
                // await user.save();
                return "Create User Success!"
            } catch (e) {
                return e
            }
        }
    }
};


export default resolvers