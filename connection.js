const {Client}=require("pg")
const client=new Client({
    user:"postgres",
    host:"localhost",
    database:"employeDetails",
    password:"rajatrajat12",
    port:5432
})

module.exports=client
