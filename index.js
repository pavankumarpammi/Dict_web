//creating dictinoray project
//https://dictionaryapi.dev/
import express from "express";
import bodyParser from "body-parser";
import { dirname, parse } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app=express();
const port=3000;
const __dirname=dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render(__dirname+'/views/sample1.ejs',{error:"wrong",message:""});
})

app.post('/find',async(req,res)=>{
    try{
        // console.log(req.body);
        const word=req.body.word;
        console.log(word);
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data;
        console.log(data); 
        const out ={
        words :data[0].word,
        phonetic:(data[0].phonetic),
        audio:(data[0].phonetics[0].audio),
        partofspeech:(data[0].meanings[0].partOfSpeech),
        definition:(data[0].meanings[0].definitions[0].definition)
        }
        console.log(out);
        res.render(__dirname+"/views/sample1.ejs",out);
       
    }
    catch (error) {
        console.error("Failed to make request:", error.message);
        res.render(__dirname+"/views/sample1.ejs", {error:"wrong",message:"Something went wrong Please Try later...",
        //   error: error.message
        });
      }
})

app.listen(process.env.PORT||port,()=>{
    console.log(`Server is running on port ${port}`);
})