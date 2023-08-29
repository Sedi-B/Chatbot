import OpenAI from "openai";
import readlineSync from "readline-sync";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

const app = express();
dotenv.config();
app.use(cors())

app.post('/', async (req, res) => {
  const prompt = req.query.prompt;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt}],
      model: "gpt-3.5-turbo",
    });
   
    const completeChat = chatCompletion.choices[0].message.content;

    // if(prompt.toLocaleLowerCase()=== 'bye'){
    //   console.log(colors.yellow('Assistant: ') + completeChat);
    //    return;
    // }
    // console.log(colors.yellow('Assistant: ') + completeChat);

    res.json({
      data: completeChat,
      status: 200,
      success: true
    })
  } catch (error) {
    console.error(colors.red(error));
    res.json({
      status: 400,
      success: false
    })
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});


async function main(){
  console.log(colors.italic.blue('Welcome to SediChat!!'));
while(true)
{
  const prompt = readlineSync.question(colors.cyan('You: '));
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt}],
      model: "gpt-3.5-turbo",
    });
   
    const completeChat = chatCompletion.choices[0].message.content;

    if(prompt.toLocaleLowerCase()=== 'bye'){
      console.log(colors.yellow('Assistant: ') + completeChat);
       return;
    }
    console.log(colors.yellow('Assistant: ') + completeChat);
  } catch (error) {
    console.error(colors.red(error));
  }
}
} 

