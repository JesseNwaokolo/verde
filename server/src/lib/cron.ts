import { CronJob } from "cron";

// every 14 minutes send a GET request to the health endpoint
const job = new CronJob("*/14 * * * *", async function () {
  const base = process.env.FRONTEND_URL;
  if (!base) return;
  const url = new URL("/health", base).href;
  try {
    const res = await fetch(url);
    console.log(
      res.ok
        ? "GET request sent successfully"
        : `GET request failed ${res.status}`,
    );
  } catch (e) {
    console.error("Error while sending request", e);
  }
});

export default job;
