import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const authPath = path.join(process.cwd(), 'data', 'auth.json');
const SESSION_NAME = 'itm_session';

function readAuth() { return JSON.parse(fs.readFileSync(authPath, 'utf-8')); }

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const auth = readAuth();
    if (username === auth.username && password === auth.password) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      const cookieStore = await cookies();
      cookieStore.set(SESSION_NAME, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_NAME);
    if (session?.value) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
