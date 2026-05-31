import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'blog.json');

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    return NextResponse.json(readData());
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = readData();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPost = {
      slug,
      title: body.title,
      category: body.category || 'Uncategorized',
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      content: body.content,
      image: body.image || '/images/hero.jpg',
      author: body.author || 'Admin',
      date: body.date || new Date().toISOString().split('T')[0],
      status: body.status || 'published',
    };
    data.unshift(newPost);
    writeData(data);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const data = readData();
    const idx = data.findIndex(p => p.slug === body.originalSlug || p.slug === body.slug);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    data[idx] = { ...data[idx], ...body };
    delete data[idx].originalSlug;
    writeData(data);
    return NextResponse.json(data[idx]);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    let data = readData();
    data = data.filter(p => p.slug !== slug);
    writeData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
