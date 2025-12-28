const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    console.log('.env.local exists at', envPath);
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    const url = envConfig.NEXT_PUBLIC_SUPABASE_URL;
    const key = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('NEXT_PUBLIC_SUPABASE_URL present:', !!url);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY present:', !!key);
} else {
    console.log('.env.local does NOT exist');
}
