import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'struktur.json');

function readData() { return JSON.parse(fs.readFileSync(dataPath, 'utf-8')); }
function writeData(d) { fs.writeFileSync(dataPath, JSON.stringify(d, null, 2), 'utf-8'); }

export async function GET() {
  try { return NextResponse.json(readData()); }
  catch { return NextResponse.json([], { status: 500 }); }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = readData();
    const newItem = {
      id: Date.now().toString(),
      nama: body.nama,
      jabatan: body.jabatan,
      foto: body.foto || '',
      order: body.order || data.length + 1,
    };
    data.push(newItem);
    writeData(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const data = readData();
    const idx = data.findIndex(m => m.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    data[idx] = { ...data[idx], ...body };
    writeData(data);
    return NextResponse.json(data[idx]);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    let data = readData();
    data = data.filter(m => m.id !== id);
    writeData(data);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
