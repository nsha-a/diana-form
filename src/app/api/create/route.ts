import { db } from "@/lib/db";
import { UserValidator } from "@/lib/validators";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, dateOfBirth, age, password } = UserValidator.parse(body);

    if (!email || !dateOfBirth || !age || !password) {
      return new Response("Missing Fields", { status: 403 });
    }

    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return new Response("User already exists", { status: 403 });
    }

    const newUser = await db.user.create({
      data: {
        email: email,
        dateOfBirth: dateOfBirth,
        age: age,
        password: password,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
