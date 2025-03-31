const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("fs");

const MODEL_NAME = "gemini-1.0-pro-vision-latest";
const API_KEY = process.env.API_KEY;

async function geminiImage() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.85,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  if (!fs.existsSync("./image_model_pics/apple.jpeg")) {
    throw new Error("Could not find images in current directory.");
  }

  const parts = [
    {
      text: "If the entered image is a nutrition label: then according to it tell me if that food item is safe for diabetes patients as a yes or no sentence and the a bit of detail (add that in the json itself with the key named - 'Consumption Guidelines'). if the input in not a food, return a json object but output '“Info”: “The input is not a food item”. If the entered image is the ingredients: then according to it tell me if that food item is safe for diabetes patients as a yes or no sentence and the a bit of detail (add that in the json itself with the key named - 'Consumption Guidelines'). I will give you a food item. then according to it tell me if that food item is safe for diabetes patients as a yes or no sentence and the a bit of detail (add that in the json itself with the key named as the dish itself). if the input in not a food, return a json object but output '“Info”: “The input is not a food item”.",
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/apple.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{ "Apple": "Yes, apples are safe to consume by diabetic patients in a moderation.Apples are generally considered safe for people with diabetes. They have a low glycemic index, which means they do not cause a rapid spike in blood sugar levels. Additionally, apples are a good source of fiber, which can help to slow down the absorption of sugar into the bloodstream. However, it is important to note that apples do contain sugar, so people with diabetes should consume them in moderation."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/dhokla.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{ "Dhokla": "Yes, Dhokla is a safe dish to have if you have diabetes as long as you monitor the sugar intake.Dhokla is a type of steamed cake made from fermented batter. It is a popular Gujarati dish. Dhokla is generally considered safe for people with diabetes, as it has a low glycemic index and is a good source of fiber. However, it is important to note that dhokla does contain some sugar, so people with diabetes should consume it in moderation."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/cake.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{ "Cake": "No, Cake are not safe to consume if you have diabetes.Cakes are a type of baked dessert that is made with flour, sugar, eggs, and butter. They are a popular celebratory food, but they are not a good choice for people with diabetes. Cakes have a high glycemic index, which means they can cause a rapid spike in blood sugar levels. Additionally, cakes are a poor source of fiber and nutrients. People with diabetes should avoid eating cakes."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/Donut.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{ "Doughnut": "No, Doughnut are not safe to consume if you have diabetes. Doughnuts are a type of fried dough that is typically coated in sugar or glaze. They are a popular breakfast food, but they are not a good choice for people with diabetes. Doughnuts have a high glycemic index, which means they can cause a rapid spike in blood sugar levels. Additionally, doughnuts are a poor source of fiber and nutrients. People with diabetes should avoid eating doughnuts."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/nutri1.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{"Consumption Guidelines\'": "This food item is not safe for diabetics because it is high in sugar and saturated fat.This food is high in carbohydrates and sugar, which can cause blood sugar levels to spike. It is also high in saturated fat, which can increase the risk of heart disease. Therefore, this food is not safe for diabetics to consume."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/nutri2.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: '{"Consumption Guidelines\'": "This food item is  safe for diabetics if consumed in moderation.Dates have a low glycemic index, which means they won\'t cause a rapid spike in blood sugar levels. They are also a good source of fiber, which can help to slow down the absorption of sugar into the bloodstream. However, dates are also high in sugar, so it is important to consume them in moderation. "}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/nutri3.jpeg")
        ).toString("base64"),
      },
    },
    {
      text: ' { "Consumption Guidelines\'": "This food item is  safe to consume for diabetic patients if consumed in moderation.Oats have a low glycemic index (GI), meaning they cause a slower rise in blood sugar. Oats are a good source of soluble fiber, which helps slow down digestion and absorption of carbohydrates. Therefore this food is safe to consume for people with diabetes."}',
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync("./image_model_pics/image7.jpeg")
        ).toString("base64"),
      },
    },
    { text: ' { "Info": "The input is not a food item."}' },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(fs.readFileSync("./uploads/img.jpg")).toString(
          "base64"
        ),
      },
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts: parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return response.text();
}

module.exports = {
  geminiImage,
};
