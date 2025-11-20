import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `
Du är Hydmos smarta AI-assistent. Hydmos är ett svenskt företag specialiserat på hydraulik, gassystem, ackumulatorer och högtrycksteknik.
Din uppgift är att hjälpa kunder med tekniska frågor, felsökning och produktinformation.

Regler:
1. Svara alltid på svenska.
2. Var professionell, tekniskt kunnig men lättförståelig.
3. Om frågan handlar om specifika reservdelar, rekommendera att kontakta supporten via formuläret.
4. Fokusera på säkerhet vid arbete med högtryck.

Exempel på ämnen du kan:
- Hydraulackumulatorer (Blåsor, kolvar, membran)
- Gasförstärkare (Gas boosters)
- Provtryckning
- Service och underhåll
`;

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Jag kan tyvärr inte ansluta till AI-tjänsten just nu. Kontrollera att API-nyckeln är konfigurerad.";
  }

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Low temperature for technical accuracy
      }
    });

    return response.text || "Jag kunde tyvärr inte generera ett svar.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ett fel uppstod vid kommunikationen med assistenten. Vänligen försök igen senare.";
  }
};