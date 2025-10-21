import { NextResponse } from "next/server";

const key = process.env.AZURE_TRANSLATOR_KEY;
const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
const region = process.env.AZURE_TRANSLATOR_REGION;

export async function POST(request) {
  const { texts, targetLang = "zh" } = await request.json();

  if (!key || !endpoint) {
    return NextResponse.json(
      { error: "Missing translator credentials" },
      { status: 500 }
    );
  }

  const url = `${endpoint}/translate?api-version=3.0&to=${targetLang}`;
  const body = texts.map((text) => ({ Text: text }));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      ...(region ? { "Ocp-Apim-Subscription-Region": region } : {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  // data is an array; each item has translations array
  const translations = data.map((item) => item.translations[0].text);

  return NextResponse.json({ translations });
}
