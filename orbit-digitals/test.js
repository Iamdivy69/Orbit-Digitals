const { GoogleGenerativeAI } = require("@google/generative-ai");

// PASTE YOUR ACTUAL KEY INSIDE THE QUOTES BELOW (No .env needed for this test)
const apiKey = "AIzaSyBiO_OSO9NWBEyHs_B1G3CwxG2OlWgnvSc"; 

async function runTest() {
  console.log("🚀 Testing with hardcoded key...");

  if (apiKey.includes("Paste_Your")) {
    console.error("❌ You forgot to paste your actual key in the code!");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Hello! Are you working?");
    const response = await result.response;
    console.log(`\n✅ SUCCESS! The bot replied: "${response.text()}"`);
    console.log("---------------------------------------------------");
    console.log("👉 YOUR KEY IS GOOD! The issue was your .env.local file.");
  } catch (error) {
    console.error("\n❌ FAILED AGAIN.");
    console.error("Error details:", error.message);
    console.log("---------------------------------------------------");
    console.log("👉 If this failed, please create a BRAND NEW key at: https://aistudio.google.com/");
  }
}

runTest();