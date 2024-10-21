interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PartialUser = Partial <User> & {id:number};

type ReadOnlyUser = Readonly <User>;

const updateUser: PartialUser = {
    id: 1,
    email: "new@email.com"
}; 

const readOnlyUser: ReadOnlyUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "secret"
};

console.log(updateUser);
console.log(readOnlyUser);

// readOnlyUser.name='james'