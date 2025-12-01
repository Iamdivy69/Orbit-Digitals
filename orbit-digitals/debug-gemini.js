const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔴 YOUR NEW KEY IS HERE:
const apiKey = "AIzaSyC6rRyMqc-Yaad2ZgDBe7OHHyot9tQjAxU"; 

async function diagnose() {
  console.log("🔍 STARTING DIAGNOSIS...");
  console.log(`🔑 Key ends with: ...${apiKey.slice(-4)}`);

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro",
    "gemini-pro"
  ];

  let success = false;

  for (const modelName of modelsToTry) {
    try {
      process.stdout.write(`👉 Testing model: "${modelName}"... `);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Test.");
      console.log("✅ WORKING!");
      console.log(`\n🎉 SOLUTION: Change your route.ts to use model: "${modelName}"`);
      success = true;
      break; 
    } catch (error) {
      if (error.message.includes("404")) {
        console.log("❌ Not Found (404)");
      } else {
        console.log(`❌ Error: ${error.message.split('[')[1] || "Unknown"}`);
      }
    }
  }

  if (!success) {
    console.log("\n⚠️ STILL FAILING.");
    console.log("If this fails, the 'Generative Language API' is still OFF in the Google Cloud Console.");
  }
}

diagnose();