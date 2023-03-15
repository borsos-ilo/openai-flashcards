import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // Handling situations of empty key
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const text = req.body.text || 'Sziasztok, hogy vagytok?';
  const language = req.body.language || 'Hungarian'
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "There's no text!",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text, language),
      temperature: 0.6,
      max_tokens: 100
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(text, language) {
  return `In the following text, please find 10 words that a B1 learner of ${language} is unlikely to know. 
  First, transform these words into their basic, stem version.
  Return them along with their English translation, in a form "foreign word" - "English translation of the word"
  
  Here's the text: ${text}`;
}