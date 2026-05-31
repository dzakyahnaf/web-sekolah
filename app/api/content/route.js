import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'data', 'content.json');
const visiPath = path.join(process.cwd(), 'data', 'visi.json');

function read(p) { return JSON.parse(fs.readFileSync(p, 'utf-8')); }
function write(p, d) { fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf-8'); }

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'content';
    if (type === 'visi') return NextResponse.json(read(visiPath));
    return NextResponse.json(read(contentPath));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const type = body._type || 'content';
    delete body._type;

    if (type === 'visi') {
      write(visiPath, body);
      return NextResponse.json(body);
    }

    const current = read(contentPath);
    const updated = { ...current, ...body };
    write(contentPath, updated);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
