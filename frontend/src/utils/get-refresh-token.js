import { google } from "googleapis";
import readline from "readline";

const oauth2Client = new google.auth.OAuth2(
  "61024912604-aifqiudck70a0n9nij1mohq1ip63gvkp.apps.googleusercontent.com",
  "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",
  "http://localhost:3000"
);

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("Authorize this app by visiting this url:", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
  rl.close();
  const { tokens } = await oauth2Client.getToken(code);
  console.log("Tokens acquired:", tokens);
});
