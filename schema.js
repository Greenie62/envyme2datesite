const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt,GraphQLBoolean} = require("graphql");
const pool = require("./pg/pool.js")



const MemberType = new GraphQLObjectType({
    name:"Member",
    fields:()=>({
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        gender:{type:GraphQLString},
        age:{type:GraphQLInt},
        email:{type:GraphQLString},
        matches:{type:MatchType}
    })
})



const MatchType = new GraphQLObjectType({
    name:"Match",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        email:{type:GraphQLString},
        gender:{type:GraphQLString},
        matchedFor:{type:GraphQLString},
    })
})



const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        members:{
            type:new GraphQLList(MemberType),
            async resolve(parent,args){
                let dbmembers = await pool.query("SELECT * FROM member");
                console.log(dbmembers)
                return dbmembers.rows
            }
        },
        member:{
            type:MemberType,
            args:{
                username:{type:GraphQLString}
            },
            async resolve(parent,args){
                let dbmember =  await pool.query("SELECT * FROM member WHERE username=($1)",[args.username])
                console.log(dbmember);
                return dbmember.rows[0]
            }
        },
        matches:{
            type:new GraphQLList(MatchType),
            async resolve(parent,args){
                let dbmatches = await pool.query("SELECT * FROM matches")
                return dbmatches.rows
            }
        },
        match:{
            type:MatchType,
            args:{
                matchedFor:{type:GraphQLString}
            },
            async resolve(parent,args){
             let dbmatch = await pool.query("SELECT * FROM mactch WHERE matchedFor=($1)",[args.matchedFor])
             return dbmatch.rows[0]
            }
        }
    }
})



const RootMutation = new GraphQLObjectType({
    name:"RootMutation",
    description:"Room mutation to add members/matches",
    fields:()=>({
        addMember:{
            type:MemberType,
            args:{
                username:{type:GraphQLString},
                password:{type:GraphQLString},
                email:{type:GraphQLString},
                age:{type:GraphQLInt},
                gender:{type:GraphQLString}
            },
            async resolve(parent,args){

                let user={
                    username:args.username,
                    password:args.password,
                    email:args.email,
                    age:args.age,
                    gender:args.age
                }
                console.log(user);
               let dbMember = await pool.query("INSERT INTO member(username,password,email,age,gender) VALUES($1, $2, $3, $4, $5)",[args.username,args.password,args.email,args.age,args.gender])
            }
        },
        addMember:{
            type:MatchType,
            args:{
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                age:{type:GraphQLInt},
                gender:{type:GraphQLString},
            },
            async resolve(parent,args){

                let matchUser={
                    username:args.username,
                    email:args.email,
                    age:args.age,
                    gender:args.age
                }
                console.log(matchUser);
               let dbMember = await pool.query("INSERT INTO match(name,email,age,gender) VALUES($1, $2, $3, $4)",[args.name,args.email,args.age,args.gender])
            }
        }
    
    })
})



module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation,
})