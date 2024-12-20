const jwt=require('jsonwebtoken'); 

const authenticationtoken=(req, res)=>
{
const header=req.headers.authorization;

const token=header.split(' ')[1];
try{
const verified=jwt.verify(token,process.env.JWT_SECRET);

req.user=verified;
}
catch(error)
{
    console.log("invalide token", error);
    res.status(403).json({error:"invalid token"});

}
}

module.exports=authenticationtoken;
//When you log in to a website, the server gives you a JWT token.
//The token has your details, like your user ID, and is signed by the server so no one can fake it.
//When you want to do something (like see your profile), you send the token to the server.
//This is usually done using a header in the request:
//Authorization: Bearer your-token-here  {bearer is the token type you can use any from postman}
//The server looks at your token to see if it’s real and hasn’t expired.
//If it’s valid, the server lets you do what you asked (like view your profile).
