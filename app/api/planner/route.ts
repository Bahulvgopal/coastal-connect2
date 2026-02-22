import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { days, district, budget, interests, food } =
      body;

    function generatePlan() {
      let plan = `🌴 ${district} ${days}-Day Travel Plan\n\n`;

      for (let i = 1; i <= days; i++) {
        plan += `Day ${i}\n`;
        plan += `• Visit famous beaches and viewpoints in ${district}\n`;
        plan += `• Experience local activities (${interests})\n`;
        plan += `• Try traditional Kerala ${food}\n`;
        plan += `• Explore cultural landmarks and markets\n`;
        plan += `• Evening sunset experience\n\n`;
      }

      plan += `Budget Level: ${budget}\n`;
      plan += `Travel Tips:\n`;
      plan += `• Start early to avoid crowds\n`;
      plan += `• Try authentic local food\n`;
      plan += `• Respect local culture\n`;

      return plan;
    }

    const plan = generatePlan();

    return NextResponse.json({ plan });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      plan: "Failed to generate plan",
    });
  }
}