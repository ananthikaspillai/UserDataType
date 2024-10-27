
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
// }
 
// type PartialUser = Partial <User> & {id:number};
 
// type ReadOnlyUser = Readonly <User>;
 
// const updateUser: PartialUser = {
//     id: 1,
//     email: "new@email.com"
// };
 
// const readOnlyUser: ReadOnlyUser = {
//     id: 1,
//     name: "John",
//     email: "john@example.com",
//     password: "secret"
// };
 
// console.log(updateUser);
// console.log(readOnlyUser);


interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PartialUser = Partial<Omit<User, 'id'>> & { id: number }; 
type ReadonlyUser = Readonly<User>; 
type PublicUser = Omit<User, 'password'>; 
type CreateUser = Omit<User, 'id'>; 
type UpdateUser = Partial<Omit<User, 'id' | 'password'>>; 
type UserCredentials = Pick<User, 'email' | 'password'>; 

function isValidUser(user: any): user is User {
    return (
        typeof user === 'object' &&
        typeof user.id === 'number' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string'
    );
}

class UserService {
    private users: ReadonlyUser[] = [];

    createUser(user: CreateUser): PublicUser {
        const newUser: User = {
            ...user,
            id: Date.now(), 
        };

        this.users = [...this.users, newUser];

        return this.getPublicUser(newUser);
    }

    updateUser(id: number, updates: UpdateUser): PublicUser | undefined {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) return undefined;

        const updatedUser: User = {
            ...this.users[userIndex],
            ...updates,
        };

        this.users = [
            ...this.users.slice(0, userIndex),
            updatedUser,
            ...this.users.slice(userIndex + 1),
        ];

        return this.getPublicUser(updatedUser);
    }

    authenticate(credentials: UserCredentials): PublicUser | undefined {
        const user = this.users.find(
            u =>
                u.email === credentials.email &&
                u.password === credentials.password 
        );

        return user ? this.getPublicUser(user) : undefined;
    }

    private getPublicUser(user: User): PublicUser {
        const { password, ...publicUser } = user;
        return publicUser;
    }
}

const userService = new UserService();

const newUser = userService.createUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secret123',
});
console.log('Created User:', newUser);

const updatedUser = userService.updateUser(newUser.id, {
    name: 'John Smiths',
});
console.log('Updated User:', updatedUser);

const authenticatedUser = userService.authenticate({
    email: 'john@example.com',
    password: 'secret123',
});
console.log('Authenticated User:', authenticatedUser);

const partialUser: PartialUser = {
    id: 1,
    email: 'new@email.com',
}; 

const readonlyUser: ReadonlyUser = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret',
};


console.log(partialUser);
console.log(readonlyUser);