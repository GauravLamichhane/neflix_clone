export async function POST(req) {
  const body = await req.json();
  const token = body.captchaToken;
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  const res = await fetch(verifyURL, { method: "POST" });
  const data = await res.json();

  if (!data.success) {
    return Response.json({ message: "Captcha failed" }, { status: 400 });
  }
  return response.json({ message: "Captcha Ok" });
}
