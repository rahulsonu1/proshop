import bcrypt from 'bcryptjs'

const users=[{
    name:'Admin User',
    email:'admin@gmail.com',
    password:bcrypt.hashSync('1234',10),
    isAdmin:false
},{
    name:'Mike',
    email:'mike@gmail.com',
    password:bcrypt.hashSync('1234',10),
   
},{
    name:'Peter',
    email:'peter@gmail.com',
    password:bcrypt.hashSync('1234',10)}
]

export default users